<?php
class wtw_3dinternet_downloads {
	/* wtw_3dinternet_downloads class for admin database functions for downloading 3D Communities, Buildings, Things, and Avatars */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {
		global $wtwplugins;
		try {
			$this->initClass();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_downloads.php-construct=".$e->getMessage());
		}
	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function defineConstants() {
		global $wtwplugins;
		try {
			if (!defined('WTW_3DINTERNET_FILE')) {
				$this->define('WTW_3DINTERNET_PREFIX', wtw_tableprefix."3dinternet_");
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_downloads.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_downloads.php-initClass=".$e->getMessage());
		}
	}
	
	public function downloadWeb($zwebid, $znewwebid, $zwebtype, $zusertoken, $zdownloadparentwebid, $zdownloadparentwebtype, $zcommunityid, $zbuildingpositionx = 0, $zbuildingpositiony = 0, $zbuildingpositionz = 0, $zbuildingscalingx = 1, $zbuildingscalingy = 1, $zbuildingscalingz = 1, $zbuildingrotationx = 0, $zbuildingrotationy = 0, $zbuildingrotationz = 0) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Item to download in the search */
		/* $zwebid is the item selected (3D Community, 3D Bulding, or 3D Thing) */
		/* $znewwebid is a proposed new value for the web id (optional) */
		/* $zwebtype is 'community', 'building', or 'thing' */ // uploads
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'webid' => $zwebid,
			'newwebid' => $znewwebid,
			'webtype' => $zwebtype,
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}

			if (!isset($zdownloadparentwebid) || empty($zdownloadparentwebid)) {
				$zdownloadparentwebid = '';
			}
			if (!isset($zdownloadparentwebtype) || empty($zdownloadparentwebtype)) {
				$zdownloadparentwebtype = '';
			}
			if (!isset($zcommunityid) || empty($zcommunityid)) {
				$zcommunityid = '';
			}
			if (!isset($zbuildingpositionx) || empty($zbuildingpositionx)) {
				$zbuildingpositionx = 0;
			}
			if (!isset($zbuildingpositiony) || empty($zbuildingpositiony)) {
				$zbuildingpositiony = 0;
			}
			if (!isset($zbuildingpositionz) || empty($zbuildingpositionz)) {
				$zbuildingpositionz = 0;
			}
			if (!isset($zbuildingscalingx) || empty($zbuildingscalingx)) {
				$zbuildingscalingx = 1;
			}
			if (!isset($zbuildingscalingy) || empty($zbuildingscalingy)) {
				$zbuildingscalingy = 1;
			}
			if (!isset($zbuildingscalingz) || empty($zbuildingscalingz)) {
				$zbuildingscalingz = 1;
			}
			if (!isset($zbuildingrotationx) || empty($zbuildingrotationx)) {
				$zbuildingrotationx = 0;
			}
			if (!isset($zbuildingrotationy) || empty($zbuildingrotationy)) {
				$zbuildingrotationy = 0;
			}
			if (!isset($zbuildingrotationz) || empty($zbuildingrotationz)) {
				$zbuildingrotationz = 0;
			}
			
			$zwebtypes = "";
			$znewcommunityid = "";
			$znewbuildingid = "";
			$znewthingid = "";
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}
			
			/* only add download if the userid exists */
			if ($wtwhandlers->hasValue($zuserid)) {
				
				/* $zwebtypes is the plural version of webtype (used in table names) */
				switch($zwebtype) {
					case "community":
						$zwebtypes = "communities";
						break;
					case "building":
						$zwebtypes = "buildings";
						break;
					case "thing":
						$zwebtypes = "things";
						break;
				}
				$znewwebid = $wtwhandlers->getNewKey($zwebtypes, $zwebtype."id", $znewwebid);
				$zresponse['newwebid'] = $znewwebid;
				switch($zwebtype) {
					case "community":
						$znewcommunityid = $znewwebid;
						break;
					case "building":
						$znewbuildingid = $znewwebid;
						break;
					case "thing":
						$znewthingid = $znewwebid;
						break;
				}
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zwebid."&webtype=".$zwebtype."&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				$zrequest = $wtwhandlers->openFilefromURL($zurl);
				if ($wtwhandlers->hasValue($zrequest)) {
					$zrequest = json_decode($zrequest);
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/'.$zwebtypes.'/'.$znewwebid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/'.$zwebtypes.'/'.$znewwebid;
				$wtwhandlers->verifyFolderExists($znewfolder);
				if (isset($zrequest->users)) {
					$this->downloadUsers(json_encode($zrequest->users), $zusertoken);
				}
				if (isset($zrequest->uploads)) {
					$this->downloadUploads(json_encode($zrequest->uploads), $znewfolder, $znewurl, $zusertoken);
				}
				if (isset($zrequest)) {
					$this->downloadMainWeb(json_encode($zrequest), $zwebtype, $znewwebid, $zdownloadparentwebtype, $zdownloadparentwebid, $zusertoken);
				}
				if (isset($zrequest->avataranimations)) {
					$this->downloadActionZonesAvatarAnimations(json_encode($zrequest->avataranimations), $znewfolder, $zusertoken);
				}
				if (isset($zrequest->actionzones)) {
					$this->downloadActionZones(json_encode($zrequest->actionzones), $znewcommunityid, $znewbuildingid, $znewthingid, $zusertoken);
				}
				if (isset($zrequest->scripts)) {
					$this->downloadScripts(json_encode($zrequest->scripts), $znewfolder, $zusertoken);
				}
				if (isset($zrequest->connectinggrids)) {
					$this->downloadConnectingGrids(json_encode($zrequest->connectinggrids), $znewwebid, $zusertoken);
				}
				if (isset($zrequest->contentratings)) {
					$this->downloadContentRatings(json_encode($zrequest->contentratings), $znewwebid, $zusertoken);
				}
				if (isset($zrequest->pluginsrequired)) {
					$this->downloadPluginsRequired(json_encode($zrequest->pluginsrequired), $znewwebid, $zusertoken);
				}
				if (isset($zrequest->uploadobjects)) {
					$this->downloadUploadObjects(json_encode($zrequest->uploadobjects), $znewfolder, $znewurl, $zusertoken);
				}
				if (isset($zrequest->molds)) {
					$this->downloadMolds(json_encode($zrequest->molds), $zwebtype, $znewwebid, $zusertoken);
				}
				if ($zwebtype == 'building' && $wtwhandlers->hasValue($zcommunityid)) {
					$this->downloadAddFirstBuilding($znewwebid, $zwebtype, $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz, $zusertoken);
				}
				if (isset($zrequest->childconnectinggrids)) {
					$this->downloadChildConnectingGrids(json_encode($zrequest->childconnectinggrids), $znewwebid, $zwebtype, $zusertoken, false);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadWeb=".$e->getMessage());
			$zresponse = array(
				'webid' => $zwebid,
				'newwebid' => $znewwebid,
				'webtype' => $zwebtype,
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadWebProgress($zwebid, $znewwebid, $zwebtype, $zusertoken, $zdownloadparentwebid, $zdownloadparentwebtype, $zcommunityid, $zbuildingpositionx = 0, $zbuildingpositiony = 0, $zbuildingpositionz = 0, $zbuildingscalingx = 1, $zbuildingscalingy = 1, $zbuildingscalingz = 1, $zbuildingrotationx = 0, $zbuildingrotationy = 0, $zbuildingrotationz = 0) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Item to download in the search */
		/* $zwebid is the item selected (3D Community, 3D Bulding, or 3D Thing) */
		/* $znewwebid is a proposed new value for the web id (optional) */
		/* $zwebtype is 'community', 'building', or 'thing' */ // uploads
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'webid' => $zwebid,
			'newwebid' => $znewwebid,
			'newcommunityid' => '',
			'newbuildingid' => '',
			'newthingid' => '',
			'webtype' => $zwebtype,
			'usertoken' => $zusertoken,
			'parentwebid' => $zdownloadparentwebid,
			'parentwebtype' => $zdownloadparentwebtype,
			'communityid' => $zcommunityid,
			'newfolder' => '',
			'newurl' => '',
			'buildingpositionx' => $zbuildingpositionx,
			'buildingpositiony' => $zbuildingpositiony,
			'buildingpositionz' => $zbuildingpositionz,
			'buildingscalingx' => $zbuildingscalingx,
			'buildingscalingy' => $zbuildingscalingy,
			'buildingscalingz' => $zbuildingscalingz,
			'buildingrotationx' => $zbuildingrotationx,
			'buildingrotationy' => $zbuildingrotationy,
			'buildingrotationz' => $zbuildingrotationz,
			'dataarray' => array(),
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}

			if (!isset($zdownloadparentwebid) || empty($zdownloadparentwebid)) {
				$zdownloadparentwebid = '';
			}
			if (!isset($zdownloadparentwebtype) || empty($zdownloadparentwebtype)) {
				$zdownloadparentwebtype = '';
			}
			if (!isset($zcommunityid) || empty($zcommunityid)) {
				$zcommunityid = '';
			}
			if (!isset($zbuildingpositionx) || empty($zbuildingpositionx)) {
				$zbuildingpositionx = 0;
			}
			if (!isset($zbuildingpositiony) || empty($zbuildingpositiony)) {
				$zbuildingpositiony = 0;
			}
			if (!isset($zbuildingpositionz) || empty($zbuildingpositionz)) {
				$zbuildingpositionz = 0;
			}
			if (!isset($zbuildingscalingx) || empty($zbuildingscalingx)) {
				$zbuildingscalingx = 1;
			}
			if (!isset($zbuildingscalingy) || empty($zbuildingscalingy)) {
				$zbuildingscalingy = 1;
			}
			if (!isset($zbuildingscalingz) || empty($zbuildingscalingz)) {
				$zbuildingscalingz = 1;
			}
			if (!isset($zbuildingrotationx) || empty($zbuildingrotationx)) {
				$zbuildingrotationx = 0;
			}
			if (!isset($zbuildingrotationy) || empty($zbuildingrotationy)) {
				$zbuildingrotationy = 0;
			}
			if (!isset($zbuildingrotationz) || empty($zbuildingrotationz)) {
				$zbuildingrotationz = 0;
			}
			
			$zwebtypes = "";
			$znewcommunityid = "";
			$znewbuildingid = "";
			$znewthingid = "";
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}
			
			/* only add download if the userid exists */
			if ($wtwhandlers->hasValue($zuserid)) {
				
				/* $zwebtypes is the plural version of webtype (used in table names) */
				switch($zwebtype) {
					case "community":
						$zwebtypes = "communities";
						break;
					case "building":
						$zwebtypes = "buildings";
						break;
					case "thing":
						$zwebtypes = "things";
						break;
				}
				$znewwebid = $wtwhandlers->getNewKey($zwebtypes, $zwebtype."id", $znewwebid);
				$zresponse['newwebid'] = $znewwebid;
				switch($zwebtype) {
					case "community":
						$znewcommunityid = $znewwebid;
						$response['newcommunityid'] = $znewcommunityid;
						break;
					case "building":
						$znewbuildingid = $znewwebid;
						$response['newbuildingid'] = $znewbuildingid;
						break;
					case "thing":
						$znewthingid = $znewwebid;
						$response['newthingid'] = $znewthingid;
						break;
				}
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zwebid."&webtype=".$zwebtype."&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				$zrequest = $wtwhandlers->openFilefromURL($zurl);
				if ($wtwhandlers->hasValue($zrequest)) {
					$zrequest = json_decode($zrequest);
					$zresponse['dataarray'] = $zrequest;
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/'.$zwebtypes.'/'.$znewwebid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/'.$zwebtypes.'/'.$znewwebid;
				$zresponse['newfolder'] = $znewfolder;
				$zresponse['newurl'] = $znewurl;
				$wtwhandlers->verifyFolderExists($znewfolder);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadWebProgress=".$e->getMessage());
			$zresponse['serror'] = $e->getMessage();
		}
		return $zresponse;
	}
	
	public function downloadUpdateWeb($zwebid, $zupdatewebid, $zwebtype, $zusertoken) {
		/* this process downloads updated version of 3D Web from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Item to update the version */
		/* $zupdatewebid is the item selected (3D Community, 3D Bulding, or 3D Thing) updated version */
		/* $zwebid is the current 3D Web being updated */
		/* $zwebtype is 'community', 'building', or 'thing' */ // uploads
		global $wtwhandlers;
		global $wtwconnect;
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}

			$zwebtypes = "";
			$znewcommunityid = "";
			$znewbuildingid = "";
			$znewthingid = "";
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}
			
			/* only add download if the userid exists */
			if ($wtwhandlers->hasValue($zuserid)) {
				
				/* $zwebtypes is the plural version of webtype (used in table names) */
				switch($zwebtype) {
					case "community":
						$zwebtypes = "communities";
						break;
					case "building":
						$zwebtypes = "buildings";
						break;
					case "thing":
						$zwebtypes = "things";
						break;
				}
//				$zwebid = $wtwhandlers->getNewKey($zwebtypes, $zwebtype."id", $zwebid);
				switch($zwebtype) {
					case "community":
						$znewcommunityid = $zwebid;
						break;
					case "building":
						$znewbuildingid = $zwebid;
						break;
					case "thing":
						$znewthingid = $zwebid;
						break;
				}
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zupdatewebid."&webtype=".$zwebtype."&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				$zrequest = $wtwhandlers->openFilefromURL($zurl);
				if ($wtwhandlers->hasValue($zrequest)) {
					$zrequest = json_decode($zrequest);
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/'.$zwebtypes.'/'.$zwebid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/'.$zwebtypes.'/'.$zwebid;
				$wtwhandlers->verifyFolderExists($znewfolder);
				
				/* process all users associated to this download (for your reference) */
				foreach ($zrequest->users as $zuser) {
					/* check if the userid is already in use */
					$znewuserid = $wtwhandlers->getNewKey('users', 'userid', $zuser->userid);
					$znewuploadpathid = $wtwhandlers->getNewKey('users', "uploadpathid", $zuser->uploadpathid);
					$zuserpassword = $wtwhandlers->getRandomString(16,1);
					$zresults = $wtwhandlers->query("
						select userid
						from ".wtw_tableprefix."users 
						where userid='".$znewuserid."'
						limit 1;
						");
					if (count($zresults) == 0) {
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."users 
							   (userid,
								pastuserid,
								displayname,
								email,
								uploadpathid,
								userpassword,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewuserid."',
								'".$zuser->userid."',
								'".addslashes($zuser->displayname)."',
								'".$zuser->email."',
								'".$znewuploadpathid."',
								'".$zuserpassword."',
								now(),
								'".$znewuserid."',
								now(),
								'".$znewuserid."');");
					}
				}


				/* process all uploads related to this download */
				foreach ($zrequest->uploads as $zupload) {
					/* assign a new uploadid if it is already in use */
					$znewuploadid = $wtwhandlers->getNewKey('uploads', "uploadid", $zupload->uploadid);

					$zneworiginalid = '';
					$znewwebsizeid = '';
					$znewthumbnailid = '';
					$znewfileurl = '';
					
					/* each image has 3 associated records for original, websize, and thumbnail */
					if ($zupload->uploadid == $zupload->originalid) {
						$zneworiginalid = $znewuploadid;
					} else if ($zupload->uploadid == $zupload->websizeid) {
						$znewwebsizeid = $znewuploadid;
					} else if ($zupload->uploadid == $zupload->thumbnailid) {
						$znewthumbnailid = $znewuploadid;
					}
					
					/* each image gets its own new ID if the initial one is already in use */
					if (empty($zneworiginalid)) {
						$zneworiginalid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zupload->originalid);
					}
					if (empty($znewwebsizeid)) {
						$znewwebsizeid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zupload->websizeid);
					}
					if (empty($znewthumbnailid)) {
						$znewthumbnailid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zupload->thumbnailid);
					}
					
					$znewuploadsfolder = $znewfolder.'/uploads';
					$znewuploadsurl = $znewurl.'/uploads';
					$wtwhandlers->verifyFolderExists($znewuploadsfolder);
					if (!empty($zupload->filepath)) {
						try {
							/* check file types for valid downloads */
							$zfileext = strtolower(pathinfo($zupload->filepath, PATHINFO_EXTENSION));
							if ($zfileext == 'babylon' || $zfileext == 'manifest' || $zfileext == 'blend' || $zfileext == 'obj' || $zfileext == 'glb' || $zfileext == 'glbt' || $zfileext == 'fbx' || $zfileext == 'dae' || $zfileext == 'stl' || $zfileext == 'jpg' || $zfileext == 'jpeg' || $zfileext == 'bmp' || $zfileext == 'tif' || $zfileext == 'tiff' || $zfileext == 'png' || $zfileext == 'gif' || $zfileext == 'webp' || $zfileext == 'wav' || $zfileext == 'mp3' || $zfileext == 'mp4' || $zfileext == 'wma' || $zfileext == 'aac' || $zfileext == 'flac' || $zfileext == 'webm' || $zfileext == 'ogg' || $zfileext == 'mpg' || $zfileext == 'avi' || $zfileext == 'mov' || $zfileext == 'wmv' || $zfileext == 'flv' || $zfileext == 'swf' || $zfileext == 'mtl' || $zfileext == '3ds' || $zfileext == 'c4d' || $zfileext == 'txt' || $zfileext == 'log' || $zfileext == 'pdf') {
								/* download each file */
								file_put_contents($znewuploadsfolder.'/'.$zupload->filename, fopen($zupload->filepath, 'r'));
								umask(0);
								chmod($znewuploadsfolder.'/'.$zupload->filename, octdec(wtw_chmod));
								if (defined('wtw_umask')) {
									/* reset umask */
									if (wtw_umask != '0') {
										umask(octdec(wtw_umask));
									}
								}
								$znewfileurl = $znewuploadsurl.'/'.$zupload->filename;
							}
						} catch (Exception $e) {
							$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUpdateWeb-getfile=".$e->getMessage());
						}	
					}
					
					/* get new foreign keys */
					/* lookup foreign key values to new assigned values using "past" field prefix */
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zupload->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zupload->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zupload->updateuserid);
					
					$zhidedate = "null";
					$zhide = "0";
					$zcheckeddate = "null";
					if (isset($zupload->hidedate)) {
						$zhidedate = "'".$zupload->hidedate."'";
					}
					if ($zupload->hide == 1) {
						$zhide = "1";
					}
					/* insert new record into uploads table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."uploads 
						   (uploadid,
							pastuploadid,
							originalid,
							websizeid,
							thumbnailid,
							userid,
							filetitle,
							filename,
							fileextension,
							filesize,
							filetype,
							filepath,
							filedata,
							imagewidth,
							imageheight,
							stock,
							hidedate,
							hideuserid,
							hide,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewuploadid."',
							'".$zupload->uploadid."',
							'".$zneworiginalid."',
							'".$znewwebsizeid."',
							'".$znewthumbnailid."',
							'".$znewuserid."',
							'".$zupload->filetitle."',
							'".$zupload->filename."',
							'".$zupload->fileextension."',
							".$zupload->filesize.",
							'".$zupload->filetype."',
							'".$znewfileurl."',
							'".$zupload->filedata."',
							".$zupload->imagewidth.",
							".$zupload->imageheight.",
							0,
							".$zhidedate.",
							'".$zupload->hideuserid."',
							".$zhide.",
							'".$zupload->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
					
					/* update foreign keys as needed */
					if (!empty($zneworiginalid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."uploads 
							set originalid='".$zneworiginalid."'
							where (pastuploadid='".$zupload->originalid."'
									or (websizeid='".$znewwebsizeid."' and not '".$znewwebsizeid."'='')
									or (thumbnailid='".$znewthumbnailid."' and not '".$znewthumbnailid."'=''))
								and originalid = '';");
					}
					if (!empty($znewwebsizeid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."uploads 
							set websizeid='".$znewwebsizeid."'
							where (pastuploadid = '".$zupload->websizeid."'
									or (originalid='".$zneworiginalid."' and not '".$zneworiginalid."'='')
									or (thumbnailid='".$znewthumbnailid."' and not '".$znewthumbnailid."'=''))
								and websizeid = '';");
					}
					if (!empty($znewthumbnailid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."uploads 
							set thumbnailid='".$znewthumbnailid."'
							where (pastuploadid='".$zupload->thumbnailid."'
									or (originalid='".$zneworiginalid."' and not '".$zneworiginalid."'='')
									or (websizeid='".$zneworiginalid."' and not '".$zneworiginalid."'=''))
								and thumbnailid = '';");
					}
				}

		
				/* write main web record */
				/* get new foreign keys */
				$znewsnapshotid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zrequest->snapshotid);
				$znewuserid = $wtwhandlers->getUserIDfromPastID($zrequest->userid);
				$znewshareuserid = $wtwhandlers->getUserIDfromPastID($zrequest->shareuserid);
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
				
				switch($zwebtype) {
					case "community":
						/* get new foreign keys */
						$znewtextureid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zrequest->textureid);
						$znewskydomeid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zrequest->skydomeid);
						
						$zfoundcommunityid = '';
						$zresults = $wtwhandlers->query("
							select communityid 
							from ".wtw_tableprefix."communities
							where communityid='".$znewcommunityid."'
							limit 1;
						");
						foreach($zresults as $zrow) {
							$zfoundcommunityid = $zrow["communityid"];
						}
						
						if ($wtwhandlers->hasValue($zfoundcommunityid)) {
							/* update communities table */
							$wtwhandlers->query("
								update ".wtw_tableprefix."communities 
								set versionid='".$zrequest->versionid."',
									version='".$zrequest->version."',
									versionorder=".$wtwhandlers->checkNumber($zrequest->versionorder).",
									versiondesc'".addslashes($zrequest->versiondesc)."',
									communitydescription='".$zrequest->communitydescription."',
									userid='".$zuserid."',
									positionx=".$wtwhandlers->checkNumber($zrequest->positionx,0).",
									positiony=".$wtwhandlers->checkNumber($zrequest->positiony,0).",
									positionz=".$wtwhandlers->checkNumber($zrequest->positionz,0).",
									scalingx=".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
									scalingy=".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
									scalingz=".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
									rotationx=".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
									rotationy=".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
									rotationz=".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
									gravity=".$wtwhandlers->checkNumber($zrequest->gravity,9.8).",
									groundpositiony=".$wtwhandlers->checkNumber($zrequest->groundpositiony,0).",
									waterpositiony=".$wtwhandlers->checkNumber($zrequest->waterpositiony,-1).",
									waterbumpheight=".$wtwhandlers->checkNumber($zrequest->waterbumpheight,.6).",
									watersubdivisions=".$wtwhandlers->checkNumber($zrequest->watersubdivisions,2).",
									windforce=".$wtwhandlers->checkNumber($zrequest->windforce,-10).",
									winddirectionx=".$wtwhandlers->checkNumber($zrequest->winddirectionx,1).",
									winddirectiony=".$wtwhandlers->checkNumber($zrequest->winddirectiony,0).",
									winddirectionz=".$wtwhandlers->checkNumber($zrequest->winddirectionz,1).",
									waterwaveheight=".$wtwhandlers->checkNumber($zrequest->waterwaveheight,.2).",
									waterwavelength=".$wtwhandlers->checkNumber($zrequest->waterwavelength,.02).",
									watercolorrefraction='".$zrequest->watercolorrefraction."',
									watercolorreflection='".$zrequest->watercolorreflection."',
									watercolorblendfactor=".$wtwhandlers->checkNumber($zrequest->watercolorblendfactor,.2).",
									watercolorblendfactor2=".$wtwhandlers->checkNumber($zrequest->watercolorblendfactor2,.2).",
									wateralpha=".$wtwhandlers->checkNumber($zrequest->wateralpha,.9).",
									waterbumpid='".$zrequest->waterbumpid."',
									textureid='".$znewtextureid."',
									skydomeid='".$znewskydomeid."',
									sceneambientcolor='".$zrequest->sceneambientcolor."',
									sceneclearcolor='".$zrequest->sceneclearcolor."',
									sceneuseclonedmeshmap=".$wtwhandlers->checkNumber($zrequest->sceneuseclonedmeshmap,1).",
									sceneblockmaterialdirtymechanism=".$wtwhandlers->checkNumber($zrequest->sceneblockmaterialdirtymechanism,1).",
									scenefogenabled=".$wtwhandlers->checkNumber($zrequest->scenefogenabled,0).",
									scenefogmode='".$zrequest->scenefogmode."',
									scenefogdensity=".$wtwhandlers->checkNumber($zrequest->scenefogdensity,.01).",
									scenefogstart=".$wtwhandlers->checkNumber($zrequest->scenefogstart,20).",
									scenefogend=".$wtwhandlers->checkNumber($zrequest->scenefogend,60).",
									scenefogcolor='".$zrequest->scenefogcolor."',
									sundirectionalintensity=".$wtwhandlers->checkNumber($zrequest->sundirectionalintensity,1).",
									sundiffusecolor='".$zrequest->sundiffusecolor."',
									sunspecularcolor='".$zrequest->sunspecularcolor."',
									sungroundcolor='".$zrequest->sungroundcolor."',
									sundirectionx=".$wtwhandlers->checkNumber($zrequest->sundirectionx,999).",
									sundirectiony=".$wtwhandlers->checkNumber($zrequest->sundirectiony,-999).",
									sundirectionz=".$wtwhandlers->checkNumber($zrequest->sundirectionz,999).",
									backlightintensity=".$wtwhandlers->checkNumber($zrequest->backlightintensity,.5).",
									backlightdirectionx=".$wtwhandlers->checkNumber($zrequest->backlightdirectionx,-999).",
									backlightdirectiony=".$wtwhandlers->checkNumber($zrequest->backlightdirectiony,999).",
									backlightdirectionz=".$wtwhandlers->checkNumber($zrequest->backlightdirectionz,-999).",
									backlightdiffusecolor='".$zrequest->backlightdiffusecolor."',
									backlightspecularcolor='".$zrequest->backlightspecularcolor."',
									skytype='".$zrequest->skytype."',
									skysize=".$wtwhandlers->checkNumber($zrequest->skysize,5000).",
									skyboxfolder='".$zrequest->skyboxfolder."',
									skyboxfile='".$zrequest->skyboxfile."',
									skyboximageleft='".$zrequest->skyboximageleft."',
									skyboximageup='".$zrequest->skyboximageup."',
									skyboximagefront='".$zrequest->skyboximagefront."',
									skyboximageright='".$zrequest->skyboximageright."',
									skyboximagedown='".$zrequest->skyboximagedown."',
									skyboximageback='".$zrequest->skyboximageback."',
									skypositionoffsetx=".$wtwhandlers->checkNumber($zrequest->skypositionoffsetx,0).",
									skypositionoffsety=".$wtwhandlers->checkNumber($zrequest->skypositionoffsety,0).",
									skypositionoffsetz=".$wtwhandlers->checkNumber($zrequest->skypositionoffsetz,0).",
									skyboxmicrosurface=".$wtwhandlers->checkNumber($zrequest->skyboxmicrosurface,0).",
									skyboxpbr=".$wtwhandlers->checkNumber($zrequest->skyboxpbr,0).",
									skyboxasenvironmenttexture=".$wtwhandlers->checkNumber($zrequest->skyboxasenvironmenttexture,0).",
									skyboxblur=".$wtwhandlers->checkNumber($zrequest->skyboxblur,0).",
									skyboxdiffusecolor='".$zrequest->skyboxdiffusecolor."',
									skyboxspecularcolor='".$zrequest->skyboxspecularcolor."',
									skyboxambientcolor='".$zrequest->skyboxambientcolor."',
									skyboxemissivecolor='".$zrequest->skyboxemissivecolor."',
									skyinclination=".$zrequest->skyinclination.",
									skyluminance=".$zrequest->skyluminance.",
									skyazimuth=".$zrequest->skyazimuth.",
									skyrayleigh=".$zrequest->skyrayleigh.",
									skyturbidity=".$zrequest->skyturbidity.",
									skymiedirectionalg=".$zrequest->skymiedirectionalg.",
									skymiecoefficient=".$zrequest->skymiecoefficient.",
									templatename='".$zrequest->templatename."',
									tags='".$zrequest->tags."',
									description='".$zrequest->description."',
									snapshotid='".$znewsnapshotid."',
									shareuserid='".$znewshareuserid."',
									alttag='".$zrequest->alttag."',
									buildingpositionx=".$wtwhandlers->checkNumber($zrequest->buildingpositionx,0).",
									buildingpositiony=".$wtwhandlers->checkNumber($zrequest->buildingpositiony,0).",
									buildingpositionz=".$wtwhandlers->checkNumber($zrequest->buildingpositionz,0).",
									buildingscalingx=".$wtwhandlers->checkNumber($zrequest->buildingscalingx,1).",
									buildingscalingy=".$wtwhandlers->checkNumber($zrequest->buildingscalingy,1).",
									buildingscalingz=".$wtwhandlers->checkNumber($zrequest->buildingscalingz,1).",
									buildingrotationx=".$wtwhandlers->checkNumber($zrequest->buildingrotationx,0).",
									buildingrotationy=".$wtwhandlers->checkNumber($zrequest->buildingrotationy,0).",
									buildingrotationz=".$wtwhandlers->checkNumber($zrequest->buildingrotationz,0).",
									updatedate=now(),
									updateuserid='".$zuserid."'
								where communityid='".$zfoundcommunityid."'
								limit 1;");
						} else {
							/* insert new record into communities table */
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."communities 
								   (communityid,
									pastcommunityid,
									versionid,
									version,
									versionorder,
									versiondesc,
									communityname,
									communitydescription,
									hostuserid,
									userid,
									positionx,
									positiony,
									positionz,
									scalingx,
									scalingy,
									scalingz,
									rotationx,
									rotationy,
									rotationz,
									gravity,
									groundpositiony,
									waterpositiony,
									waterbumpheight,
									watersubdivisions,
									windforce,
									winddirectionx,
									winddirectiony,
									winddirectionz,
									waterwaveheight,
									waterwavelength,
									watercolorrefraction,
									watercolorreflection,
									watercolorblendfactor,
									watercolorblendfactor2,
									wateralpha,
									waterbumpid,
									textureid,
									skydomeid,
									sceneambientcolor,
									sceneclearcolor,
									sceneuseclonedmeshmap,
									sceneblockmaterialdirtymechanism,
									scenefogenabled,
									scenefogmode,
									scenefogdensity,
									scenefogstart,
									scenefogend,
									scenefogcolor,
									sundirectionalintensity,
									sundiffusecolor,
									sunspecularcolor,
									sungroundcolor,
									sundirectionx,
									sundirectiony,
									sundirectionz,
									backlightintensity,
									backlightdirectionx,
									backlightdirectiony,
									backlightdirectionz,
									backlightdiffusecolor,
									backlightspecularcolor,
									skytype,
									skysize,
									skyboxfolder,
									skyboxfile,
									skyboximageleft,
									skyboximageup,
									skyboximagefront,
									skyboximageright,
									skyboximagedown,
									skyboximageback,
									skypositionoffsetx,
									skypositionoffsety,
									skypositionoffsetz,
									skyboxmicrosurface,
									skyboxpbr,
									skyboxasenvironmenttexture,
									skyboxblur,
									skyboxdiffusecolor,
									skyboxspecularcolor,
									skyboxambientcolor,
									skyboxemissivecolor,
									skyinclination,
									skyluminance,
									skyazimuth,
									skyrayleigh,
									skyturbidity,
									skymiedirectionalg,
									skymiecoefficient,
									templatename,
									tags,
									description,
									snapshotid,
									shareuserid,
									alttag,
									buildingpositionx,
									buildingpositiony,
									buildingpositionz,
									buildingscalingx,
									buildingscalingy,
									buildingscalingz,
									buildingrotationx,
									buildingrotationy,
									buildingrotationz,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								values
								   ('".$znewcommunityid."',
									'".$zrequest->communityid."',
									'".$zrequest->versionid."',
									'".$zrequest->version."',
									".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
									'".addslashes($zrequest->versiondesc)."',
									'".$zrequest->communityname."',
									'".$zrequest->communitydescription."',
									'".$zhostuserid."',
									'".$zuserid."',
									".$wtwhandlers->checkNumber($zrequest->positionx,0).",
									".$wtwhandlers->checkNumber($zrequest->positiony,0).",
									".$wtwhandlers->checkNumber($zrequest->positionz,0).",
									".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
									".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
									".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
									".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
									".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
									".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
									".$wtwhandlers->checkNumber($zrequest->gravity,9.8).",
									".$wtwhandlers->checkNumber($zrequest->groundpositiony,0).",
									".$wtwhandlers->checkNumber($zrequest->waterpositiony,-1).",
									".$wtwhandlers->checkNumber($zrequest->waterbumpheight,.6).",
									".$wtwhandlers->checkNumber($zrequest->watersubdivisions,2).",
									".$wtwhandlers->checkNumber($zrequest->windforce,-10).",
									".$wtwhandlers->checkNumber($zrequest->winddirectionx,1).",
									".$wtwhandlers->checkNumber($zrequest->winddirectiony,0).",
									".$wtwhandlers->checkNumber($zrequest->winddirectionz,1).",
									".$wtwhandlers->checkNumber($zrequest->waterwaveheight,.2).",
									".$wtwhandlers->checkNumber($zrequest->waterwavelength,.02).",
									'".$zrequest->watercolorrefraction."',
									'".$zrequest->watercolorreflection."',
									".$wtwhandlers->checkNumber($zrequest->watercolorblendfactor,.2).",
									".$wtwhandlers->checkNumber($zrequest->watercolorblendfactor2,.2).",
									".$wtwhandlers->checkNumber($zrequest->wateralpha,.9).",
									'".$zrequest->waterbumpid."',
									'".$znewtextureid."',
									'".$znewskydomeid."',
									'".$zrequest->sceneambientcolor."',
									'".$zrequest->sceneclearcolor."',
									".$wtwhandlers->checkNumber($zrequest->sceneuseclonedmeshmap,1).",
									".$wtwhandlers->checkNumber($zrequest->sceneblockmaterialdirtymechanism,1).",
									".$wtwhandlers->checkNumber($zrequest->scenefogenabled,0).",
									'".$zrequest->scenefogmode."',
									".$wtwhandlers->checkNumber($zrequest->scenefogdensity,.01).",
									".$wtwhandlers->checkNumber($zrequest->scenefogstart,20).",
									".$wtwhandlers->checkNumber($zrequest->scenefogend,60).",
									'".$zrequest->scenefogcolor."',
									".$wtwhandlers->checkNumber($zrequest->sundirectionalintensity,1).",
									'".$zrequest->sundiffusecolor."',
									'".$zrequest->sunspecularcolor."',
									'".$zrequest->sungroundcolor."',
									".$wtwhandlers->checkNumber($zrequest->sundirectionx,999).",
									".$wtwhandlers->checkNumber($zrequest->sundirectiony,-999).",
									".$wtwhandlers->checkNumber($zrequest->sundirectionz,999).",
									".$wtwhandlers->checkNumber($zrequest->backlightintensity,.5).",
									".$wtwhandlers->checkNumber($zrequest->backlightdirectionx,-999).",
									".$wtwhandlers->checkNumber($zrequest->backlightdirectiony,999).",
									".$wtwhandlers->checkNumber($zrequest->backlightdirectionz,-999).",
									'".$zrequest->backlightdiffusecolor."',
									'".$zrequest->backlightspecularcolor."',
									'".$zrequest->skytype."',
									".$wtwhandlers->checkNumber($zrequest->skysize,5000).",
									'".$zrequest->skyboxfolder."',
									'".$zrequest->skyboxfile."',
									'".$zrequest->skyboximageleft."',
									'".$zrequest->skyboximageup."',
									'".$zrequest->skyboximagefront."',
									'".$zrequest->skyboximageright."',
									'".$zrequest->skyboximagedown."',
									'".$zrequest->skyboximageback."',
									".$wtwhandlers->checkNumber($zrequest->skypositionoffsetx,0).",
									".$wtwhandlers->checkNumber($zrequest->skypositionoffsety,0).",
									".$wtwhandlers->checkNumber($zrequest->skypositionoffsetz,0).",
									".$wtwhandlers->checkNumber($zrequest->skyboxmicrosurface,0).",
									".$wtwhandlers->checkNumber($zrequest->skyboxpbr,0).",
									".$wtwhandlers->checkNumber($zrequest->skyboxasenvironmenttexture,0).",
									".$wtwhandlers->checkNumber($zrequest->skyboxblur,0).",
									'".$zrequest->skyboxdiffusecolor."',
									'".$zrequest->skyboxspecularcolor."',
									'".$zrequest->skyboxambientcolor."',
									'".$zrequest->skyboxemissivecolor."',
									".$zrequest->skyinclination.",
									".$zrequest->skyluminance.",
									".$zrequest->skyazimuth.",
									".$zrequest->skyrayleigh.",
									".$zrequest->skyturbidity.",
									".$zrequest->skymiedirectionalg.",
									".$zrequest->skymiecoefficient.",
									'".$zrequest->templatename."',
									'".$zrequest->tags."',
									'".$zrequest->description."',
									'".$znewsnapshotid."',
									'".$znewshareuserid."',
									'".$zrequest->alttag."',
									".$wtwhandlers->checkNumber($zrequest->buildingpositionx,0).",
									".$wtwhandlers->checkNumber($zrequest->buildingpositiony,0).",
									".$wtwhandlers->checkNumber($zrequest->buildingpositionz,0).",
									".$wtwhandlers->checkNumber($zrequest->buildingscalingx,1).",
									".$wtwhandlers->checkNumber($zrequest->buildingscalingy,1).",
									".$wtwhandlers->checkNumber($zrequest->buildingscalingz,1).",
									".$wtwhandlers->checkNumber($zrequest->buildingrotationx,0).",
									".$wtwhandlers->checkNumber($zrequest->buildingrotationy,0).",
									".$wtwhandlers->checkNumber($zrequest->buildingrotationz,0).",
									now(),
									'".$zuserid."',
									now(),
									'".$zuserid."');");
						}
						break;
					case "building":
						$zfoundbuildingid = '';
						$zresults = $wtwhandlers->query("
							select buildingid 
							from ".wtw_tableprefix."buildings
							where buildingid='".$znewbuildingid."'
							limit 1;
						");
						foreach($zresults as $zrow) {
							$zfoundbuildingid = $zrow["buildingid"];
						}
						
						if ($wtwhandlers->hasValue($zfoundbuildingid)) {
							/* update buildings table */
							$wtwhandlers->query("
								update ".wtw_tableprefix."buildings 
								set versionid='".$zrequest->versionid."',
									version='".$zrequest->version."',
									versionorder='".$wtwhandlers->checkNumber($zrequest->versionorder,1000000)."',
									versiondesc='".addslashes($zrequest->versiondesc)."',
									buildingdescription='".$zrequest->buildingdescription."',
									userid='".$zuserid."',
									positionx=".$wtwhandlers->checkNumber($zrequest->positionx,0).",
									positiony=".$wtwhandlers->checkNumber($zrequest->positiony,0).",
									positionz=".$wtwhandlers->checkNumber($zrequest->positionz,0).",
									scalingx=".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
									scalingy=".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
									scalingz=".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
									rotationx=".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
									rotationy=".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
									rotationz=".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
									gravity=".$wtwhandlers->checkNumber($zrequest->gravity,9.8).",
									templatename='".$zrequest->templatename."',
									tags='".$zrequest->tags."',
									description='".$zrequest->description."',
									snapshotid='".$znewsnapshotid."',
									shareuserid='".$znewshareuserid."',
									alttag='".$zrequest->alttag."',
									updatedate=now(),
									updateuserid='".$zuserid."'
								where buildingid='".$znewbuildingid."'
								limit 1;");
						} else {
							/* insert new record into buildings table */
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."buildings 
								   (buildingid,
									pastbuildingid,
									versionid,
									version,
									versionorder,
									versiondesc,
									buildingname,
									buildingdescription,
									hostuserid,
									userid,
									positionx,
									positiony,
									positionz,
									scalingx,
									scalingy,
									scalingz,
									rotationx,
									rotationy,
									rotationz,
									gravity,
									templatename,
									tags,
									description,
									snapshotid,
									shareuserid,
									alttag,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								values
								   ('".$znewbuildingid."',
									'".$zrequest->buildingid."',
									'".$zrequest->versionid."',
									'".$zrequest->version."',
									".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
									'".addslashes($zrequest->versiondesc)."',
									'".$zrequest->buildingname."',
									'".$zrequest->buildingdescription."',
									'".$zhostuserid."',
									'".$zuserid."',
									".$wtwhandlers->checkNumber($zrequest->positionx,0).",
									".$wtwhandlers->checkNumber($zrequest->positiony,0).",
									".$wtwhandlers->checkNumber($zrequest->positionz,0).",
									".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
									".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
									".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
									".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
									".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
									".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
									".$wtwhandlers->checkNumber($zrequest->gravity,9.8).",
									'".$zrequest->templatename."',
									'".$zrequest->tags."',
									'".$zrequest->description."',
									'".$znewsnapshotid."',
									'".$znewshareuserid."',
									'".$zrequest->alttag."',
									now(),
									'".$zuserid."',
									now(),
									'".$zuserid."');");
						}
						break;
					case "thing":
						$zfoundthingid = '';
						$zresults = $wtwhandlers->query("
							select thingid 
							from ".wtw_tableprefix."things
							where thingid='".$znewthingid."'
							limit 1;
						");
						foreach($zresults as $zrow) {
							$zfoundthingid = $zrow["thingid"];
						}
						
						if ($wtwhandlers->hasValue($zfoundthingid)) {
							/* update things table */
							$wtwhandlers->query("
								update ".wtw_tableprefix."things 
								set versionid='".$zrequest->versionid."',
									version='".$zrequest->version."',
									versionorder=".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
									versiondesc='".addslashes($zrequest->versiondesc)."',
									thingdescription='".$zrequest->thingdescription."',
									userid='".$zuserid."',
									positionx=".$wtwhandlers->checkNumber($zrequest->positionx,0).",
									positiony=".$wtwhandlers->checkNumber($zrequest->positiony,0).",
									positionz=".$wtwhandlers->checkNumber($zrequest->positionz,0).",
									scalingx=".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
									scalingy=".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
									scalingz=".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
									rotationx=".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
									rotationy=".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
									rotationz=".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
									gravity=".$wtwhandlers->checkNumber($zrequest->gravity,9.8).",
									templatename='".$zrequest->templatename."',
									tags='".$zrequest->tags."',
									description='".$zrequest->description."',
									snapshotid='".$znewsnapshotid."',
									shareuserid='".$znewshareuserid."',
									alttag='".$zrequest->alttag."',
									updatedate=now(),
									updateuserid='".$zuserid."'
								where thingid='".$znewthingid."'
								limit 1;");
						} else {
							/* insert new record into things table */
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."things 
								   (thingid,
									pastthingid,
									versionid,
									version,
									versionorder,
									versiondesc,
									thingname,
									thingdescription,
									hostuserid,
									userid,
									positionx,
									positiony,
									positionz,
									scalingx,
									scalingy,
									scalingz,
									rotationx,
									rotationy,
									rotationz,
									gravity,
									templatename,
									tags,
									description,
									snapshotid,
									shareuserid,
									alttag,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								values
								   ('".$znewthingid."',
									'".$zrequest->thingid."',
									'".$zrequest->versionid."',
									'".$zrequest->version."',
									".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
									'".addslashes($zrequest->versiondesc)."',
									'".$zrequest->thingname."',
									'".$zrequest->thingdescription."',
									'".$zhostuserid."',
									'".$zuserid."',
									".$wtwhandlers->checkNumber($zrequest->positionx,0).",
									".$wtwhandlers->checkNumber($zrequest->positiony,0).",
									".$wtwhandlers->checkNumber($zrequest->positionz,0).",
									".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
									".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
									".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
									".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
									".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
									".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
									".$wtwhandlers->checkNumber($zrequest->gravity,9.8).",
									'".$zrequest->templatename."',
									'".$zrequest->tags."',
									'".$zrequest->description."',
									'".$znewsnapshotid."',
									'".$znewshareuserid."',
									'".$zrequest->alttag."',
									now(),
									'".$zuserid."',
									now(),
									'".$zuserid."');");
						}
						break;
				}	
				
				/* process all avatar animations */
				foreach ($zrequest->avataranimations as $zavataranimation) {
				
					/* check if the avataranimationid is already in use */
					$znewavataranimationid = $wtwhandlers->getNewKey('avataranimations', "avataranimationid", $zavataranimation->avataranimationid);
					
					$znewanimationicon = '';
					
					$znewobjectfolder = $znewfolder.'/avataranimations';
					$wtwhandlers->verifyFolderExists($znewobjectfolder);
					if (!empty($zavataranimation->objectfolder) && !empty($zavataranimation->objectfile)) {
						$znewobjectfolder = $znewfolder.'/avataranimations/'.str_replace(".obj","",str_replace(".gltf","",str_replace(".glb","",str_replace(".babylon","",$zavataranimation->objectfile))));
						$wtwhandlers->verifyFolderExists($znewobjectfolder);
						$zfileext = strtolower(pathinfo($znewobjectfolder."/".$zavataranimation->objectfile, PATHINFO_EXTENSION));
						if ($zfileext == 'babylon') {
							try {
								file_put_contents($znewobjectfolder."/".$zavataranimation->objectfile, fopen($zavataranimation->objectfolder.$zavataranimation->objectfile, 'r'));
								umask(0);
								chmod($znewobjectfolder."/".$zavataranimation->objectfile, octdec(wtw_chmod));
								if (defined('wtw_umask')) {
									/* reset umask */
									if (wtw_umask != '0') {
										umask(octdec(wtw_umask));
									}
								}
							} catch (Exception $e) {
								$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUpdateWeb-getfile-babylon=".$e->getMessage());
							}	
							try {
								file_put_contents($znewobjectfolder."/".$zavataranimation->objectfile.".manifest", fopen($zavataranimation->objectfolder.$zavataranimation->objectfile.".manifest", 'r'));
								umask(0);
								chmod($znewobjectfolder."/".$zavataranimation->objectfile.".manifest", octdec(wtw_chmod));
								if (defined('wtw_umask')) {
									/* reset umask */
									if (wtw_umask != '0') {
										umask(octdec(wtw_umask));
									}
								}
							} catch (Exception $e) {
								$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUpdateWeb-getfile-manifest=".$e->getMessage());
							}	
							
							if (!empty($zavataranimation->animationicon)) {
								try {
									$ziconfilename = basename($zavataranimation->animationicon);  
									$znewanimationicon = $znewobjectfolder."/".$ziconfilename;
									file_put_contents($znewanimationicon, fopen($zavataranimation->animationicon, 'r'));
									umask(0);
									chmod($znewanimationicon, octdec(wtw_chmod));
									if (defined('wtw_umask')) {
										/* reset umask */
										if (wtw_umask != '0') {
											umask(octdec(wtw_umask));
										}
									}
								} catch (Exception $e) {
									$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUpdateWeb-getfile-icon=".$e->getMessage());
								}	
							}
						}
					}
					
					/* get new foreign keys */
					$znewsoundid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zavataranimation->soundid);
					
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zavataranimation->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zavataranimation->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zavataranimation->updateuserid);
					
					/* insert new record into avataranimations table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avataranimations 
						   (avataranimationid,
							pastavataranimationid,
							userid,
							loadpriority,
							animationevent,
							animationfriendlyname,
							animationicon,
							objectfolder,
							objectfile,
							startframe,
							endframe,
							animationloop,
							speedratio,
							soundid,
							soundmaxdistance,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewavataranimationid."',
							'".$zavataranimation->avataranimationid."',
							'".$znewuserid."',
							".$wtwhandlers->checkNumber($zavataranimation->loadpriority,25).",
							'".$zavataranimation->animationevent."',
							'".$zavataranimation->animationfriendlyname."',
							'".$znewanimationicon."',
							'".$znewobjectfolder."',
							'".$zavataranimation->objectfile."',
							".$wtwhandlers->checkNumber($zavataranimation->startframe,1).",
							".$wtwhandlers->checkNumber($zavataranimation->endframe,1).",
							".$wtwhandlers->checkNumber($zavataranimation->animationloop,1).",
							".$wtwhandlers->checkNumber($zavataranimation->speedratio,1).",
							'".$znewsoundid."',
							".$wtwhandlers->checkNumber($zavataranimation->soundmaxdistance,100).",
							'".$zavataranimation->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
				}			
				

				/* process all action zones */
				foreach ($zrequest->actionzones as $zactionzone) {
					/* check if the actionzoneid is already in use */
					$znewactionzoneid = '';
					
					/* get new foreign keys */
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zactionzone->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zactionzone->updateuserid);
					
					$zfoundactionzoneid = '';
					$zresults = $wtwhandlers->query("
						select actionzoneid
						from ".wtw_tableprefix."actionzones
						where actionzoneid='".$zactionzone->actionzoneid."'
						limit 1;
					");
					foreach ($zresults as $zrow) {
						$zfoundactionzoneid = $zrow["actionzoneid"];
					}
					
					if ($wtwhandlers->hasValue($zfoundactionzoneid)) {
						$znewactionzoneid = $zfoundactionzoneid;

						/* update actionzones table */
						$wtwhandlers->query("
							update ".wtw_tableprefix."actionzones 
							set communityid='".$znewcommunityid."',
								buildingid='".$znewbuildingid."',
								thingid='".$znewthingid."',
								attachmoldid='".$zactionzone->attachmoldid."',
								loadactionzoneid='".$zactionzone->loadactionzoneid."',
								parentactionzoneid='".$zactionzone->parentactionzoneid."',
								teleportwebid='".$zactionzone->teleportwebid."',
								teleportwebtype='".$zactionzone->teleportwebtype."',
								spawnactionzoneid='".$zactionzone->spawnactionzoneid."',
								actionzonename='".$zactionzone->actionzonename."',
								actionzonetype='".$zactionzone->actionzonetype."',
								actionzoneshape='".$zactionzone->actionzoneshape."',
								movementtype='".$zactionzone->movementtype."',
								movementdistance=".$zactionzone->movementdistance.",
								positionx=".$zactionzone->positionx.",
								positiony=".$zactionzone->positiony.",
								positionz=".$zactionzone->positionz.",
								scalingx=".$zactionzone->scalingx.",
								scalingy=".$zactionzone->scalingy.",
								scalingz=".$zactionzone->scalingz.",
								rotationx=".$zactionzone->rotationx.",
								rotationy=".$zactionzone->rotationy.",
								rotationz=".$zactionzone->rotationz.",
								axispositionx=".$zactionzone->axispositionx.",
								axispositiony=".$zactionzone->axispositiony.",
								axispositionz=".$zactionzone->axispositionz.",
								axisrotationx=".$zactionzone->axisrotationx.",
								axisrotationy=".$zactionzone->axisrotationy.",
								axisrotationz=".$zactionzone->axisrotationz.",
								rotateaxis='".$zactionzone->rotateaxis."',
								rotatedegrees=".$zactionzone->rotatedegrees.",
								rotatedirection=".$zactionzone->rotatedirection.",
								rotatespeed=".$zactionzone->rotatespeed.",
								value1=".$zactionzone->value1.",
								value2=".$zactionzone->value2.",
								defaulteditform=".$zactionzone->defaulteditform.",
								jsfunction='".$zactionzone->jsfunction."',
								jsparameters='".$zactionzone->jsparameters."',
								updatedate=now(),
								updateuserid='".$znewupdateuserid."'
							where actionzoneid='".$znewactionzoneid."'
							limit 1;");
					} else {
						/* get new key */
						$znewactionzoneid = $wtwhandlers->getNewKey('actionzones', "actionzoneid", $zactionzone->actionzoneid);
						
						/* insert new record into actionzones table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."actionzones 
							   (actionzoneid,
								pastactionzoneid,
								communityid,
								buildingid,
								thingid,
								attachmoldid,
								loadactionzoneid,
								parentactionzoneid,
								teleportwebid,
								teleportwebtype,
								spawnactionzoneid,
								actionzonename,
								actionzonetype,
								actionzoneshape,
								movementtype,
								movementdistance,
								positionx,
								positiony,
								positionz,
								scalingx,
								scalingy,
								scalingz,
								rotationx,
								rotationy,
								rotationz,
								axispositionx,
								axispositiony,
								axispositionz,
								axisrotationx,
								axisrotationy,
								axisrotationz,
								rotateaxis,
								rotatedegrees,
								rotatedirection,
								rotatespeed,
								value1,
								value2,
								defaulteditform,
								jsfunction,
								jsparameters,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewactionzoneid."',
								'".$zactionzone->actionzoneid."',
								'".$znewcommunityid."',
								'".$znewbuildingid."',
								'".$znewthingid."',
								'".$zactionzone->attachmoldid."',
								'".$zactionzone->loadactionzoneid."',
								'".$zactionzone->parentactionzoneid."',
								'".$zactionzone->teleportwebid."',
								'".$zactionzone->teleportwebtype."',
								'".$zactionzone->spawnactionzoneid."',
								'".$zactionzone->actionzonename."',
								'".$zactionzone->actionzonetype."',
								'".$zactionzone->actionzoneshape."',
								'".$zactionzone->movementtype."',
								".$zactionzone->movementdistance.",				
								".$zactionzone->positionx.",
								".$zactionzone->positiony.",
								".$zactionzone->positionz.",
								".$zactionzone->scalingx.",
								".$zactionzone->scalingy.",
								".$zactionzone->scalingz.",
								".$zactionzone->rotationx.",
								".$zactionzone->rotationy.",
								".$zactionzone->rotationz.",
								".$zactionzone->axispositionx.",
								".$zactionzone->axispositiony.",
								".$zactionzone->axispositionz.",
								".$zactionzone->axisrotationx.",
								".$zactionzone->axisrotationy.",
								".$zactionzone->axisrotationz.",
								'".$zactionzone->rotateaxis."',
								".$zactionzone->rotatedegrees.",
								".$zactionzone->rotatedirection.",
								".$zactionzone->rotatespeed.",
								".$zactionzone->value1.",
								".$zactionzone->value2.",
								".$zactionzone->defaulteditform.",
								'".$zactionzone->jsfunction."',
								'".$zactionzone->jsparameters."',
								'".$zactionzone->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");
					}
						
					foreach ($zactionzone->animations as $zazanimation) {
						/* check if the actionzoneanimationid is already in use */
						$znewactionzoneanimationid = $wtwhandlers->getNewKey('actionzoneanimations', "actionzoneanimationid", $zazanimation->actionzoneanimationid);
						
						/* get new foreign keys */
						$znewavataranimationid = $wtwhandlers->getIDByPastID('avataranimations', 'avataranimationid', 'pastavataranimationid', $zazanimation->avataranimationid);
						
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zazanimation->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zazanimation->updateuserid);

						$zfoundactionzoneanimationid = '';
						$zresults = $wtwhandlers->query("
							select actionzoneanimationid
							from ".wtw_tableprefix."actionzoneanimations
							where actionzoneanimationid='".$zazanimation->actionzoneanimationid."'
							limit 1;
						");
						foreach ($zresults as $zrow) {
							$zfoundactionzoneanimationid = $zrow["actionzoneanimationid"];
						}
						
						if ($wtwhandlers->hasValue($zfoundactionzoneanimationid)) {
							/* update actionzoneanimations table */
							$wtwhandlers->query("
								update ".wtw_tableprefix."actionzoneanimations 
								set actionzoneid='".$znewactionzoneid."',
									communityid='".$znewcommunityid."',
									buildingid='".$znewbuildingid."',
									thingid='".$znewthingid."',
									avataranimationid='".$znewavataranimationid."',
									updatedate=now(),
									updateuserid='".$znewupdateuserid."'
								where actionzoneanimationid='".$zfoundactionzoneanimationid."'
								limit 1;");	
						} else {
							/* insert new record into actionzoneanimations table */
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."actionzoneanimations 
								   (actionzoneanimationid,
									pastactionzoneanimationid,
									actionzoneid,
									communityid,
									buildingid,
									thingid,
									avataranimationid,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								values
								   ('".$znewactionzoneanimationid."',
									'".$zazanimation->actionzoneanimationid."',
									'".$znewactionzoneid."',
									'".$znewcommunityid."',
									'".$znewbuildingid."',
									'".$znewthingid."',
									'".$znewavataranimationid."',
									'".$zazanimation->createdate."',
									'".$znewcreateuserid."',
									now(),
									'".$znewupdateuserid."');");	
						}
					}
				}

				/* process action zone foreign action zones */
				$zresults = $wtwhandlers->query("
					select *  from ".wtw_tableprefix."actionzones 
					where communityid='".$znewcommunityid."'
						and buildingid='".$znewbuildingid."'
						and thingid='".$znewthingid."';");
				foreach ($zresults as $zrow) {
					/* get new foreign keys */
					$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zrow["loadactionzoneid"]);
					$znewparentactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zrow["parentactionzoneid"]);
					$znewspawnactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zrow["spawnactionzoneid"]);

					$wtwhandlers->query("
						update ".wtw_tableprefix."actionzones
						set loadactionzoneid='".$znewloadactionzoneid."',
							parentactionzoneid='".$znewparentactionzoneid."',
							spawnactionzoneid='".$znewspawnactionzoneid."'
						where actionzoneid='".$zrow["actionzoneid"]."'
						limit 1;");
				}


				/* process all scripts */
				foreach ($zrequest->scripts as $zscript) {
				
					/* check if the scriptid is already in use */
					$znewscriptid = $wtwhandlers->getNewKey('scripts', "scriptid", $zscript->scriptid);
					
					$znewscriptfolder = $znewfolder.'/scripts';
					$wtwhandlers->verifyFolderExists($znewscriptfolder);
					if (!empty($zscript->scriptpath)) {
						$zfileext = strtolower(pathinfo($znewscriptfolder."/".$zscript->scriptfilename, PATHINFO_EXTENSION));
						if ($zfileext == 'js') {
							try {
								file_put_contents($znewscriptfolder."/".$zscript->scriptfilename, fopen($zscript->scriptpath, 'r'));
								umask(0);
								chmod($znewscriptfolder."/".$zscript->scriptfilename, octdec(wtw_chmod));
								if (defined('wtw_umask')) {
									/* reset umask */
									if (wtw_umask != '0') {
										umask(octdec(wtw_umask));
									}
								}
							} catch (Exception $e) {
								$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUpdateWeb-getfile-js=".$e->getMessage());
							}	
						}
					}
					
					/* get new foreign keys */
					$znewactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zscript->actionzoneid);
					
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zscript->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zscript->updateuserid);
					
					/* insert new record into scripts table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."scripts 
						   (scriptid,
							pastscriptid,
							actionzoneid,
							webtype,
							scriptname,
							scriptpath,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewscriptid."',
							'".$zscript->scriptid."',
							'".$znewactionzoneid."',
							'".$zscript->webtype."',
							'".$zscript->scriptname."',
							'".$znewscriptfolder."/".$zscript->scriptfilename."',
							'".$zscript->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");		
				}


				/* process parent connecting grids */
				foreach ($zrequest->connectinggrids as $zconnectinggrid) {
					/* check if the connectinggridid is already in use */
					$znewconnectinggridid = $wtwhandlers->getNewKey('connectinggrids', "connectinggridid", $zconnectinggrid->connectinggridid);
					
					/* get new foreign keys */
					$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->loadactionzoneid);
					$znewaltloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->altloadactionzoneid);
					$znewunloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->unloadactionzoneid);
					$znewattachactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->attachactionzoneid);
					
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->updateuserid);
					
					$zfoundconnectinggridid = '';
					$zresults = $wtwhandlers->query("
						select connectinggridid
						from ".wtw_tableprefix."connectinggrids
						where connectinggridid='".$zconnectinggrid->connectinggridid."'
						limit 1;
					");
					foreach ($zresults as $zrow) {
						$zfoundconnectinggridid = $zrow["connectinggridid"];
					}
					
					if ($wtwhandlers->hasValue($zfoundconnectinggridid)) {
						/* update connectinggrids table */
						$wtwhandlers->query("
							update ".wtw_tableprefix."connectinggrids 
							set parentwebid='',
								parentwebtype='".$zconnectinggrid->parentwebtype."',
								childwebid='".$zwebid."',
								childwebtype='".$zconnectinggrid->childwebtype."',
								loadactionzoneid='".$znewloadactionzoneid."',
								altloadactionzoneid='".$znewaltloadactionzoneid."',
								unloadactionzoneid='".$znewunloadactionzoneid."',
								attachactionzoneid='".$znewattachactionzoneid."',
								alttag='".$zconnectinggrid->alttag."',
								updatedate=now(),
								updateuserid='".$znewupdateuserid."'
							where connectinggridid='".$zfoundconnectinggridid."'
							limit 1;");
					} else {
						
						/* insert new record into connectinggrids table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."connectinggrids 
							   (connectinggridid,
								pastconnectinggridid,
								parentwebid,
								parentwebtype,
								childwebid,
								childwebtype,
								positionx,
								positiony,
								positionz,
								scalingx,
								scalingy,
								scalingz,
								rotationx,
								rotationy,
								rotationz,
								loadactionzoneid,
								altloadactionzoneid,
								unloadactionzoneid,
								attachactionzoneid,
								alttag,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewconnectinggridid."',
								'".$zconnectinggrid->connectinggridid."',
								'',
								'".$zconnectinggrid->parentwebtype."',
								'".$zwebid."',
								'".$zconnectinggrid->childwebtype."',
								".$zconnectinggrid->positionx.",
								".$zconnectinggrid->positiony.",
								".$zconnectinggrid->positionz.",
								".$zconnectinggrid->scalingx.",
								".$zconnectinggrid->scalingy.",
								".$zconnectinggrid->scalingz.",
								".$zconnectinggrid->rotationx.",
								".$zconnectinggrid->rotationy.",
								".$zconnectinggrid->rotationz.",
								'".$znewloadactionzoneid."',
								'".$znewaltloadactionzoneid."',
								'".$znewunloadactionzoneid."',
								'".$znewattachactionzoneid."',
								'".$zconnectinggrid->alttag."',
								'".$zconnectinggrid->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");
					}
				}
				
				/* process content ratings */
				foreach ($zrequest->contentratings as $zcontentrating) {
					/* check if the contentratingid is already in use */
					$znewcontentratingid = $wtwhandlers->getNewKey('contentratings', "contentratingid", $zcontentrating->contentratingid);
					
					/* get new foreign keys */
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->updateuserid);

					$zfoundcontentratingid = '';
					$zresults = $wtwhandlers->query("
						select contentratingid
						from ".wtw_tableprefix."contentratings
						where contentratingid='".$zcontentrating->contentratingid."'
						limit 1;
					");
					foreach ($zresults as $zrow) {
						$zfoundcontentratingid = $zrow["contentratingid"];
					}
					
					if ($wtwhandlers->hasValue($zfoundcontentratingid)) {
					
						/* insert new record into contentratings table */
						$wtwhandlers->query("
							update ".wtw_tableprefix."contentratings 
							set webid='".$zwebid."',
								webtype='".$zcontentrating->webtype."',
								rating='".$zcontentrating->rating."',
								ratingvalue=".$zcontentrating->ratingvalue.",
								contentwarning='".$zcontentrating->contentwarning."',
								updatedate=now(),
								updateuserid='".$znewupdateuserid."'
							where contentratingid='".$zfoundcontentratingid."'
							limit 1;");
					} else {
						/* insert new record into contentratings table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."contentratings 
							   (contentratingid,
								pastcontentratingid,
								webid,
								webtype,
								rating,
								ratingvalue,
								contentwarning,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewcontentratingid."',
								'".$zcontentrating->contentratingid."',
								'".$zwebid."',
								'".$zcontentrating->webtype."',
								'".$zcontentrating->rating."',
								".$zcontentrating->ratingvalue.",
								'".$zcontentrating->contentwarning."',
								'".$zcontentrating->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");
					}
				}
				
				/* process plugins ratings */
				foreach ($zrequest->pluginsrequired as $zpluginrequired) {
					/* check if the pluginsrequiredid is already in use */
					$znewpluginsrequiredid = $wtwhandlers->getNewKey('pluginsrequired', "pluginsrequiredid", $zpluginrequired->pluginsrequiredid);
					
					/* get new foreign keys */
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zpluginrequired->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zpluginrequired->updateuserid);

					$zfoundpluginsrequiredid = '';
					$zresults = $wtwhandlers->query("
						select pluginsrequiredid
						from ".wtw_tableprefix."pluginsrequired
						where pluginsrequiredid='".$zpluginrequired->pluginsrequiredid."'
						limit 1;
					");
					foreach ($zresults as $zrow) {
						$zfoundpluginsrequiredid = $zrow["pluginsrequiredid"];
					}
					
					$zoptional = '0';
					if ($wtwhandlers->hasValue($zpluginrequired->optional)) {
						if ($zpluginrequired->optional == '1') {
							$zoptional = '1';
						}
					}

					if ($wtwhandlers->hasValue($zfoundpluginsrequiredid)) {
						/* insert new record into pluginsrequired table */
						$wtwhandlers->query("
							update ".wtw_tableprefix."pluginsrequired 
							set webid='".$zwebid."',
								webtype='".$zpluginrequired->webtype."'
								pluginname='".$zpluginrequired->pluginname."',
								optional=".$zoptional.",
								updatedate=now(),
								updateuserid='".$znewupdateuserid."'
							where pluginsrequiredid='".$zfoundpluginsrequiredid."'
							limit 1;");
					} else {
						/* insert new record into pluginsrequired table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."pluginsrequired 
							   (pluginsrequiredid,
								pastpluginsrequiredid,
								webid,
								webtype,
								pluginname,
								optional,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewpluginsrequiredid."',
								'".$zpluginrequired->pluginsrequiredid."',
								'".$zwebid."',
								'".$zpluginrequired->webtype."',
								'".$zpluginrequired->pluginname."',
								".$zoptional.",
								'".$zpluginrequired->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");
					}
				}
				
				/* create array of uploadobjects to update the groupid after they are all added to the table (next section) */
				$i = 0;
				$zgroups = array();
				/* process uploaded objects */
				foreach ($zrequest->uploadobjects as $zuploadobject) {
					$znewuploadobjectid = $wtwhandlers->getNewKey('uploadobjects', "uploadobjectid", $zuploadobject->uploadobjectid);
					$zgroupid = $zuploadobject->groupid;
					if (!isset($zgroupid) || empty($zgroupid)) {
						/* set to old id, will be updated in next section */
						$zgroupid = $zuploadobject->uploadobjectid;
					}
					$zgroups[$i] = array(
						'uploadobjectid'=>$zuploadobject->uploadobjectid,
						'pastuploadobjectid'=>$znewuploadobjectid,
						'groupid'=>$zgroupid
					);
					$i += 1;
					
					if ($wtwhandlers->hasValue($zuploadobject->uploadobjectid)) {
						$znewobjectfolder = $znewfolder.'/objects';
						$wtwhandlers->verifyFolderExists($znewobjectfolder);
						$znewobjectfolder = $znewfolder.'/objects/'.str_replace(".obj","",str_replace(".gltf","",str_replace(".glb","",str_replace(".babylon","",$zuploadobject->objectfile))));
						$wtwhandlers->verifyFolderExists($znewobjectfolder);
						$znewobjecturl = $znewurl.'/objects/'.str_replace(".obj","",str_replace(".gltf","",str_replace(".glb","",str_replace(".babylon","",$zuploadobject->objectfile))))."/";
						
						/* get new foreign keys */
						$znewuserid = $wtwhandlers->getUserIDfromPastID($zuploadobject->userid);
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobject->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobject->updateuserid);
						
						/* insert new record into uploadobjects table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."uploadobjects 
							   (uploadobjectid,
								pastuploadobjectid,
							    groupid,
								hostuserid,
								userid,
								objectfolder,
								objectfile,
								stock,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewuploadobjectid."',
								'".$zuploadobject->uploadobjectid."',
								'".$zgroupid."',
								'".$zhostuserid."',
								'".$zuserid."',
								'".$znewobjecturl."',
								'".$zuploadobject->objectfile."',
								".$zuploadobject->stock.",
								'".$zuploadobject->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");
						
						foreach($zuploadobject->objectfiles as $zfile) {
							try {
								$zfileext = strtolower(pathinfo($zfile->filepath, PATHINFO_EXTENSION));
								if ($zfileext == 'babylon' || $zfileext == 'manifest' || $zfileext == 'blend' || $zfileext == 'obj' || $zfileext == 'glb' || $zfileext == 'glbt' || $zfileext == 'fbx' || $zfileext == 'dae' || $zfileext == 'stl' || $zfileext == 'jpg' || $zfileext == 'jpeg' || $zfileext == 'bmp' || $zfileext == 'tif' || $zfileext == 'tiff' || $zfileext == 'png' || $zfileext == 'gif' || $zfileext == 'webp' || $zfileext == 'wav' || $zfileext == 'mp3' || $zfileext == 'mp4' || $zfileext == 'wma' || $zfileext == 'aac' || $zfileext == 'flac' || $zfileext == 'webm' || $zfileext == 'ogg' || $zfileext == 'mpg' || $zfileext == 'avi' || $zfileext == 'mov' || $zfileext == 'wmv' || $zfileext == 'flv' || $zfileext == 'swf' || $zfileext == 'mtl' || $zfileext == '3ds' || $zfileext == 'c4d' || $zfileext == 'txt' || $zfileext == 'log' || $zfileext == 'pdf') {
									file_put_contents($znewobjectfolder.'/'.$zfile->filename, fopen($zfile->filepath, 'r'));
									umask(0);
									chmod($znewobjectfolder.'/'.$zfile->filename, octdec(wtw_chmod));
									if (defined('wtw_umask')) {
										/* reset umask */
										if (wtw_umask != '0') {
											umask(octdec(wtw_umask));
										}
									}
								}
							} catch (Exception $e) {
								$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUpdateWeb-getfiles=".$e->getMessage());
							}	
						}
						
						
						/* process upload object animations */
						foreach ($zuploadobject->uploadobjectanimations as $zuploadobjectanimation) {
						
							/* check if the upload object animation id (objectanimationid) is already in use */
							$znewobjectanimationid = $wtwhandlers->getNewKey('uploadobjectanimations', "objectanimationid", $zuploadobjectanimation->objectanimationid);
							
							/* get new foreign keys */
							$znewsoundid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zuploadobjectanimation->soundid);
							
							$znewuserid = $wtwhandlers->getUserIDfromPastID($zuploadobjectanimation->userid);
							$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobjectanimation->createuserid);
							$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobjectanimation->updateuserid);
							
							/* insert new record into uploadobjectanimations table */
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."uploadobjectanimations 
								   (objectanimationid,
									pastobjectanimationid,
									uploadobjectid,
									userid,
									animationname,
									moldnamepart,
									moldevent,
									startframe,
									endframe,
									animationloop,
									speedratio,
									animationendscript,
									animationendparameters,
									stopcurrentanimations,
									additionalscript,
									additionalparameters,
									soundid,
									soundmaxdistance,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								values
								   ('".$znewobjectanimationid."',
									'".$zuploadobjectanimation->objectanimationid."',
									'".$znewuploadobjectid."',
									'".$znewuserid."',
									'".$zuploadobjectanimation->animationname."',
									'".$zuploadobjectanimation->moldnamepart."',
									'".$zuploadobjectanimation->moldevent."',
									".$zuploadobjectanimation->startframe.",
									".$zuploadobjectanimation->endframe.",
									".$zuploadobjectanimation->animationloop.",
									".$zuploadobjectanimation->speedratio.",
									'".$zuploadobjectanimation->animationendscript."',
									'".$zuploadobjectanimation->animationendparameters."',
									".$zuploadobjectanimation->stopcurrentanimations.",
									'".$zuploadobjectanimation->additionalscript."',
									'".$zuploadobjectanimation->additionalparameters."',
									'".$znewsoundid."',
									".$zuploadobjectanimation->soundmaxdistance.",
									'".$zuploadobjectanimation->createdate."',
									'".$znewcreateuserid."',
									now(),
									'".$znewupdateuserid."');");
						}
					}
				}
				/* update groupid to new uploadobjectid based */
				foreach ($zgroups as $zgroup) {
					$znewgroupid = $zgroup['uploadobjectid'];
					$zresults = $wtwhandlers->query("
						select uploadobjectid
						from ".wtw_tableprefix."uploadobjects
						where pastuploadobjectid='".$zgroup['groupid']."'
							and deleted=0
						order by updatedate desc
						limit 1;
					");
					foreach ($zresults as $zrow) {
						$znewgroupid = $zrow['uploadobjectid'];
					}
					if (!isset($znewgroupid) || empty($znewgroupid)) {
						$znewgroupid = $zgroup['uploadobjectid'];
					}
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploadobjects
						set groupid='".$znewgroupid."'
						where uploadobjectid='".$zgroup['uploadobjectid']."';
					");
				}

				/* process all molds */
				foreach ($zrequest->molds as $zmold) {
					/* check if the moldid is already in use */
					$znewmoldid = '';
					$zsql = '';
					$zsqlvalues = '';
					$zfoundmoldid = '';

					switch($zwebtype) {
						case "community":
							$zresults = $wtwhandlers->query("
								select communitymoldid
								from ".wtw_tableprefix."communitymolds
								where communitymoldid='".$zmold->communitymoldid."'
								limit 1;
							");
							foreach ($zresults as $zrow) {
								$zfoundmoldid = $zrow["communitymoldid"];
							}
							
							if ($wtwhandlers->hasValue($zfoundmoldid)) {
								/* update communitymolds table */
								$znewmoldid = $zfoundmoldid;
								$zsql = "update ".wtw_tableprefix."communitymolds
								   set communityid='".$znewcommunityid."',";
								$zsqlvalues = "where communitymoldid='".$zfoundmoldid."'
									limit 1;";
							} else {
								$znewmoldid = $wtwhandlers->getNewKey($zwebtype.'molds', $zwebtype.'moldid', $zmold->communitymoldid);
								/* insert new record into communitymolds table */
								$zsql = "insert into ".wtw_tableprefix."communitymolds
								   (communitymoldid,
									pastcommunitymoldid,
									communityid,";
								$zsqlvalues = "('".$znewmoldid."',
									'".$zmold->communitymoldid."',
									'".$znewcommunityid."',";
							}
							break;
						case "building":
							$zresults = $wtwhandlers->query("
								select buildingmoldid
								from ".wtw_tableprefix."buildingmolds
								where buildingmoldid='".$zmold->buildingmoldid."'
								limit 1;
							");
							foreach ($zresults as $zrow) {
								$zfoundmoldid = $zrow["buildingmoldid"];
							}
							
							if ($wtwhandlers->hasValue($zfoundmoldid)) {
								/* update buildingmolds table */
								$znewmoldid = $zfoundmoldid;
								$zsql = "update ".wtw_tableprefix."buildingmolds
								   set buildingid='".$znewbuildingid."',";
								$zsqlvalues = "where buildingmoldid='".$zfoundmoldid."'
									limit 1;";
							} else {
								$znewmoldid = $wtwhandlers->getNewKey($zwebtype.'molds', $zwebtype.'moldid', $zmold->buildingmoldid);
								/* insert new record into buildingmolds table */
								$zsql = "insert into ".wtw_tableprefix."buildingmolds
								   (buildingmoldid,
									pastbuildingmoldid,
									buildingid,";
								$zsqlvalues = "('".$znewmoldid."',
									'".$zmold->buildingmoldid."',
									'".$znewbuildingid."',";
							}
							break;
						case "thing":
							$zresults = $wtwhandlers->query("
								select thingmoldid
								from ".wtw_tableprefix."thingmolds
								where thingmoldid='".$zmold->thingmoldid."'
								limit 1;
							");
							foreach ($zresults as $zrow) {
								$zfoundmoldid = $zrow["thingmoldid"];
							}
							
							if ($wtwhandlers->hasValue($zfoundmoldid)) {
								/* update thingmolds table */
								$znewmoldid = $zfoundmoldid;
								$zsql = "update ".wtw_tableprefix."thingmolds
								   set thingid='".$znewthingid."',";
								$zsqlvalues = "where thingmoldid='".$zfoundmoldid."'
									limit 1;";
							} else {
								$znewmoldid = $wtwhandlers->getNewKey($zwebtype.'molds', $zwebtype.'moldid', $zmold->thingmoldid);
								/* insert new record into thingmolds table */
								$zsql = "insert into ".wtw_tableprefix."thingmolds
								   (thingmoldid,
									pastthingmoldid,
									thingid,";
								$zsqlvalues = "('".$znewmoldid."',
									'".$zmold->pastthingmoldid."',
									'".$znewthingid."',";
							}
							break;
					}

					if (!empty($zsql)) {
						$znewtextureid = '';
						$znewtexturebumpid = '';
						$znewtexturehoverid = '';
						$znewvideoid = '';
						$znewvideoposterid = '';
						$znewheightmapid = '';
						$znewmixmapid = '';
						$znewtexturerid = '';
						$znewtexturegid = '';
						$znewtexturebid = '';
						$znewtexturebumprid = '';
						$znewtexturebumpgid = '';
						$znewtexturebumpbid = '';
						$znewsoundid = '';
						$znewtextureid = '';
						
						/* get new foreign keys */
						$znewtextureid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->textureid);
						$znewtexturebumpid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumpid);
						$znewtexturehoverid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturehoverid);
						$znewvideoid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->videoid);
						$znewvideoposterid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->videoposterid);
						$znewheightmapid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->heightmapid);
						$znewmixmapid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->mixmapid);
						$znewtexturerid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturerid);
						$znewtexturegid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturegid);
						$znewtexturebid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebid);
						$znewtexturebumprid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumprid);
						$znewtexturebumpgid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumpgid);
						$znewtexturebumpbid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumpbid);
						$znewsoundid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->soundid);

						$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zmold->loadactionzoneid);
						$znewunloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zmold->unloadactionzoneid);
						$znewactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zmold->actionzoneid);
						
						$znewuploadobjectid = $wtwhandlers->getIDByPastID('uploadobjects', 'uploadobjectid', 'pastuploadobjectid', $zmold->uploadobjectid);
						
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zmold->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zmold->updateuserid);
						
						if ($wtwhandlers->hasValue($zfoundmoldid)) {
							/* remainder fo the common fields for communitymolds, buildingmolds, and thingmolds */
							$zsql .= "
								loadactionzoneid='".$znewloadactionzoneid."',
								unloadactionzoneid='".$znewunloadactionzoneid."',
								shape='".$zmold->shape."',
								covering='".$zmold->covering."',
								positionx=".$zmold->positionx.",
								positiony=".$zmold->positiony.",
								positionz=".$zmold->positionz.",
								scalingx=".$zmold->scalingx.",
								scalingy=".$zmold->scalingy.",
								scalingz=".$zmold->scalingz.",
								rotationx=".$zmold->rotationx.",
								rotationy=".$zmold->rotationy.",
								rotationz=".$zmold->rotationz.",
								special1=".$zmold->special1.",
								special2=".$zmold->special2.",
								uoffset=".$zmold->uoffset.",
								voffset=".$zmold->voffset.",
								uscale=".$zmold->uscale.",
								vscale=".$zmold->vscale.",
								uploadobjectid='".$znewuploadobjectid."',
								graphiclevel=".$zmold->graphiclevel.",
								textureid='".$znewtextureid."',
								texturebumpid='".$znewtexturebumpid."',
								texturehoverid='".$znewtexturehoverid."',
								videoid='".$znewvideoid."',
								videoposterid='".$znewvideoposterid."',
								diffusecolor='".$zmold->diffusecolor."',
								specularcolor='".$zmold->specularcolor."',
								emissivecolor='".$zmold->emissivecolor."',
								ambientcolor='".$zmold->ambientcolor."',
								heightmapid='".$znewheightmapid."',
								mixmapid='".$znewmixmapid."',
								texturerid='".$znewtexturerid."',
								texturegid='".$znewtexturegid."',
								texturebid='".$znewtexturebid."',
								texturebumprid='".$znewtexturebumprid."',
								texturebumpgid='".$znewtexturebumpgid."',
								texturebumpbid='".$znewtexturebumpbid."',
								soundid='".$znewsoundid."',
								soundname='".$zmold->soundname."',
								soundattenuation='".$zmold->soundattenuation."',
								soundloop=".$zmold->soundloop.",
								soundmaxdistance=".$zmold->soundmaxdistance.",
								soundrollofffactor=".$zmold->soundrollofffactor.",
								soundrefdistance=".$zmold->soundrefdistance.",
								soundconeinnerangle=".$zmold->soundconeinnerangle.",
								soundconeouterangle=".$zmold->soundconeouterangle.",
								soundconeoutergain=".$zmold->soundconeoutergain.",
								webtext='".$zmold->webtext."',
								webstyle='".$zmold->webstyle."',
								opacity=".$zmold->opacity.",
								sideorientation='".$zmold->sideorientation."',
								billboard=".$zmold->billboard.",
								waterreflection=".$zmold->waterreflection.",
								receiveshadows=".$zmold->receiveshadows.",
								subdivisions=".$zmold->subdivisions.",
								minheight=".$zmold->minheight.",
								maxheight=".$zmold->maxheight.",
								checkcollisions=".$zmold->checkcollisions.",
								ispickable=".$zmold->ispickable.",
								actionzoneid='".$znewactionzoneid."',
								csgmoldid='".$zmold->csgmoldid."',
								csgaction='".$zmold->csgaction."',
								alttag='".$zmold->alttag."',
								jsfunction='".$zmold->jsfunction."',
								jsparameters='".$zmold->jsparameters."',
								updatedate=now(),
								updateuserid='".$znewupdateuserid."' ";

						} else {
							/* remainder fo the common fields for communitymolds, buildingmolds, and thingmolds */
							$zsql .= "
								loadactionzoneid,
								unloadactionzoneid,
								shape,
								covering,
								positionx,
								positiony,
								positionz,
								scalingx,
								scalingy,
								scalingz,
								rotationx,
								rotationy,
								rotationz,
								special1,
								special2,
								uoffset,
								voffset,
								uscale,
								vscale,
								uploadobjectid,
								graphiclevel,
								textureid,
								texturebumpid,
								texturehoverid,
								videoid,
								videoposterid,
								diffusecolor,
								specularcolor,
								emissivecolor,
								ambientcolor,
								heightmapid,
								mixmapid,
								texturerid,
								texturegid,
								texturebid,
								texturebumprid,
								texturebumpgid,
								texturebumpbid,
								soundid,
								soundname,
								soundattenuation,
								soundloop,
								soundmaxdistance,
								soundrollofffactor,
								soundrefdistance,
								soundconeinnerangle,
								soundconeouterangle,
								soundconeoutergain,
								webtext,
								webstyle,
								opacity,
								sideorientation,
								billboard,
								waterreflection,
								receiveshadows,
								subdivisions,
								minheight,
								maxheight,
								checkcollisions,
								ispickable,
								actionzoneid,
								csgmoldid,
								csgaction,
								alttag,
								jsfunction,
								jsparameters,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
								values ";
							
							$zsqlvalues .= "
								'".$znewloadactionzoneid."',
								'".$znewunloadactionzoneid."',
								'".$zmold->shape."',
								'".$zmold->covering."',
								".$zmold->positionx.",
								".$zmold->positiony.",
								".$zmold->positionz.",
								".$zmold->scalingx.",
								".$zmold->scalingy.",
								".$zmold->scalingz.",
								".$zmold->rotationx.",
								".$zmold->rotationy.",
								".$zmold->rotationz.",
								".$zmold->special1.",
								".$zmold->special2.",
								".$zmold->uoffset.",
								".$zmold->voffset.",
								".$zmold->uscale.",
								".$zmold->vscale.",
								'".$znewuploadobjectid."',
								".$zmold->graphiclevel.",
								'".$znewtextureid."',
								'".$znewtexturebumpid."',
								'".$znewtexturehoverid."',
								'".$znewvideoid."',
								'".$znewvideoposterid."',
								'".$zmold->diffusecolor."',
								'".$zmold->specularcolor."',
								'".$zmold->emissivecolor."',
								'".$zmold->ambientcolor."',
								'".$znewheightmapid."',
								'".$znewmixmapid."',
								'".$znewtexturerid."',
								'".$znewtexturegid."',
								'".$znewtexturebid."',
								'".$znewtexturebumprid."',
								'".$znewtexturebumpgid."',
								'".$znewtexturebumpbid."',
								'".$znewsoundid."',
								'".$zmold->soundname."',
								'".$zmold->soundattenuation."',
								".$zmold->soundloop.",
								".$zmold->soundmaxdistance.",
								".$zmold->soundrollofffactor.",
								".$zmold->soundrefdistance.",
								".$zmold->soundconeinnerangle.",
								".$zmold->soundconeouterangle.",
								".$zmold->soundconeoutergain.",
								'".$zmold->webtext."',
								'".$zmold->webstyle."',
								".$zmold->opacity.",
								'".$zmold->sideorientation."',
								".$zmold->billboard.",
								".$zmold->waterreflection.",
								".$zmold->receiveshadows.",
								".$zmold->subdivisions.",
								".$zmold->minheight.",
								".$zmold->maxheight.",
								".$zmold->checkcollisions.",
								".$zmold->ispickable.",
								'".$znewactionzoneid."',
								'".$zmold->csgmoldid."',
								'".$zmold->csgaction."',
								'".$zmold->alttag."',
								'".$zmold->jsfunction."',
								'".$zmold->jsparameters."',
								'".$zmold->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');";
												
						}
						if (!empty($zsql)) {
							$wtwhandlers->query($zsql.$zsqlvalues);
						}
						
						/*  get mold points */
						foreach ($zmold->moldpoints as $zmoldpoint) {
							
							/* get new foreign keys */
							$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zmoldpoint->createuserid);
							$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zmoldpoint->updateuserid);
							
							$zfoundmoldpointid = '';
							$zresults = $wtwhandlers->query("
								select moldpointid
								from ".wtw_tableprefix."moldpoints
								where moldpointid='".$zmoldpoint->moldpointid."'
								limit 1;
							");
							foreach ($zresults as $zrow) {
								$zfoundmoldpointid = $zrow["moldpointid"];
							}
							
							if ($wtwhandlers->hasValue($zfoundmoldpointid)) {
								/* update moldpoints table */
								$wtwhandlers->query("
									update ".wtw_tableprefix."moldpoints 
									set	moldid='".$znewmoldid."',
										pathnumber=".$zmoldpoint->pathnumber.",
										sorder=".$zmoldpoint->sorder.",
										positionx=".$zmoldpoint->positionx.",
										positiony=".$zmoldpoint->positiony.",
										positionz=".$zmoldpoint->positionz.",
										updatedate=now(),
										updateuserid='".$znewupdateuserid."'
									where moldpointid='".$zfoundmoldpointid."'
									limit 1;");
							} else {
								$znewmoldpointid = $wtwhandlers->getNewKey('moldpoints', 'moldpointid', $zmoldpoint->moldpointid);
								/* insert new record into moldpoints table */
								$wtwhandlers->query("
									insert into ".wtw_tableprefix."moldpoints 
									   (moldpointid,
										pastmoldpointid,
										moldid,
										pathnumber,
										sorder,
										positionx,
										positiony,
										positionz,
										createdate,
										createuserid,
										updatedate,
										updateuserid)
									values
									   ('".$znewmoldpointid."',
										'".$zmoldpoint->moldpointid."',
										'".$znewmoldid."',
										".$zmoldpoint->pathnumber.",
										".$zmoldpoint->sorder.",
										".$zmoldpoint->positionx.",
										".$zmoldpoint->positiony.",
										".$zmoldpoint->positionz.",
										'".$zmoldpoint->createdate."',
										'".$znewcreateuserid."',
										now(),
										'".$znewupdateuserid."');");
							}

						}
						
						/* process csg molds */
						$zresults = $wtwhandlers->query("
							select *  from ".wtw_tableprefix.$zwebtype."molds 
							where ".$zwebtype."moldid='".$znewmoldid."'
								and not csgmoldid='';");
						foreach ($zresults as $zrow) {
							/* get new foreign keys */
							$znewcsgmoldid = $wtwhandlers->getIDByPastID($zwebtype.'molds', $zwebtype.'moldid', 'past'.$zwebtype.'moldid', $zrow["csgmoldid"]);
							
							$wtwhandlers->query("
								update ".wtw_tableprefix.$zwebtype."molds
								set csgmoldid='".$znewcsgmoldid."'
								where ".$zwebtype."moldid='".$zrow[$zwebtype."moldid"]."'
									and not csgmoldid=''
								limit 1;");
						}


						/* process action zone attach molds */
						$zresults = $wtwhandlers->query("
							select *  from ".wtw_tableprefix."actionzones 
							where ".$zwebtype."id='".$zwebid."'
								and not attachmoldid='';");
						foreach ($zresults as $zrow) {
							/* get new foreign keys */
							$znewattachmoldid = $wtwhandlers->getIDByPastID($zwebtype.'molds', $zwebtype.'moldid', 'past'.$zwebtype.'moldid', $zrow["attachmoldid"]);
							
							$wtwhandlers->query("
								update ".wtw_tableprefix."actionzones
								set attachmoldid='".$znewattachmoldid."'
								where actionzoneid='".$zrow["actionzoneid"]."'
									and not attachmoldid=''
								limit 1;");
						}


						/* get webimages */
						foreach ($zmold->webimages as $zwebimage) {

							$znewcommunitymoldid = '';
							$znewbuildingmoldid = '';
							$znewthingmoldid = '';
							switch ($zwebtype) {
								case 'community':
									$znewcommunitymoldid = $znewmoldid;
									break;
								case 'building':
									$znewbuildingmoldid = $znewmoldid;
									break;
								case 'thing':
									$znewthingmoldid = $znewmoldid;
									break;
							}
							/* get new foreign keys */
							$znewimageid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zwebimage->imageid);
							$znewimagehoverid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zwebimage->imagehoverid);
							$znewimageclickid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zwebimage->imageclickid);
							
							$znewuserid = $wtwhandlers->getUserIDfromPastID($zwebimage->userid);
							$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zwebimage->createuserid);
							$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zwebimage->updateuserid);
							
							$zfoundwebimageid = '';
							$zresults = $wtwhandlers->query("
								select webimageid
								from ".wtw_tableprefix."webimages
								where webimageid='".$zwebimage->webimageid."'
								limit 1;
							");
							foreach ($zresults as $zrow) {
								$zfoundwebimageid = $zrow["webimageid"];
							}
							
							if ($wtwhandlers->hasValue($zfoundwebimageid)) {
								/* update webimages table */
								$wtwhandlers->query("
									update ".wtw_tableprefix."webimages 
									set communitymoldid='".$znewcommunitymoldid."',
										buildingmoldid='".$znewbuildingmoldid."',
										thingmoldid='".$znewthingmoldid."',
										imageindex=".$zwebimage->imageindex.",
										imageid='".$znewimageid."',
										imagehoverid='".$znewimagehoverid."',
										imageclickid='".$znewimageclickid."',
										graphiclevel=".$zwebimage->graphiclevel.",
										jsfunction='".$zwebimage->jsfunction."',
										jsparameters='".$zwebimage->jsparameters."',
										userid='".$znewuserid."',
										alttag='".$zwebimage->alttag."',
										updatedate=now(),
										updateuserid='".$znewupdateuserid."'
									where webimageid='".$zfoundwebimageid."'
									limit 1;");	
							} else {
								$znewwebimageid = $wtwhandlers->getNewKey('webimages', 'webimageid', $zwebimage->webimageid);
								/* insert new record into webimages table */
								$wtwhandlers->query("
									insert into ".wtw_tableprefix."webimages 
									   (webimageid,
										pastwebimageid,
										communitymoldid,
										buildingmoldid,
										thingmoldid,
										imageindex,
										imageid,
										imagehoverid,
										imageclickid,
										graphiclevel,
										jsfunction,
										jsparameters,
										userid,
										alttag,
										createdate,
										createuserid,
										updatedate,
										updateuserid)
									values
									   ('".$znewwebimageid."',
										'".$zwebimage->webimageid."',
										'".$znewcommunitymoldid."',
										'".$znewbuildingmoldid."',
										'".$znewthingmoldid."',
										".$zwebimage->imageindex.",
										'".$znewimageid."',
										'".$znewimagehoverid."',
										'".$znewimageclickid."',
										".$zwebimage->graphiclevel.",
										'".$zwebimage->jsfunction."',
										'".$zwebimage->jsparameters."',
										'".$znewuserid."',
										'".$zwebimage->alttag."',
										'".$zwebimage->createdate."',
										'".$znewcreateuserid."',
										now(),
										'".$znewupdateuserid."');");	
							}

						}			
					}
				}

				/* process child connecting grids */
				if ($zwebtype != 'thing') {
					$zdiffwebid = '';
					foreach ($zrequest->childconnectinggrids as $zconnectinggrid) {
					
						/* check if the connectinggridid is already in use */
						$znewconnectinggridid = $wtwhandlers->getNewKey('connectinggrids', 'connectinggridid', $zconnectinggrid->connectinggridid);

						if (($zwebtype == 'community' && ($zconnectinggrid->childwebtype == 'building' || $zconnectinggrid->childwebtype == 'thing')) || ($zwebtype == 'building' && $zconnectinggrid->childwebtype == 'thing')) {
							$zfetchweb = false;
							
							/* look out for duplicates, while making sure we get each 3D webs */
							$znewchildwebid = '';
							$znewchildwebtypes = '';
							switch ($zconnectinggrid->childwebtype) {
								case "community":
									$znewchildwebtypes = 'communities';
									break;
								case "building":
									$znewchildwebtypes = 'buildings';
									break;
								case "thing":
									$znewchildwebtypes = 'things';
									break;
							}
							$znewchildwebid = $wtwhandlers->getNewKey($znewchildwebtypes, $zconnectinggrid->childwebtype.'id', $zconnectinggrid->childwebid);
							$zfoundconnectinggridid = '';
							if ($zdiffwebid != $zconnectinggrid->childwebid) {
								$zfetchweb = true;
								$zdiffwebid = $zconnectinggrid->childwebid;
								
								$zresults = $wtwhandlers->query("
									select *  from ".wtw_tableprefix."connectinggrids 
									where connectinggridid='".$zconnectinggrid->connectinggridid."'
									limit 1;");
								foreach ($zresults as $zrow) {
									$zfoundconnectinggridid = $zrow["connectinggridid"];
								}
							} else {
								$zresults = $wtwhandlers->query("
									select *  from ".wtw_tableprefix.$znewchildwebtypes." 
									where past".$zconnectinggrid->childwebtype."id='".$zconnectinggrid->childwebid."'
									order by createdate desc
									limit 1;");
								foreach ($zresults as $zrow) {
									$znewchildwebid = $zrow[$zconnectinggrid->childwebtype."id"];
								}
							}
							
							/* get new foreign keys */
							$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->loadactionzoneid);
							$znewaltloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->altloadactionzoneid);
							$znewunloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->unloadactionzoneid);
							$znewattachactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->attachactionzoneid);
							
							$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->createuserid);
							$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->updateuserid);
							
							if ($wtwhandlers->hasValue($zfoundconnectinggridid)) {
								/* already found */
								$zfetchweb = false;
								$wtwhandlers->query("
									update ".wtw_tableprefix."connectinggrids 
									set parentwebid='".$zwebid."',
										parentwebtype='".$zconnectinggrid->parentwebtype."',
										childwebid='".$znewchildwebid."',
										childwebtype='".$zconnectinggrid->childwebtype."',
										positionx=".$zconnectinggrid->positionx.",
										positiony=".$zconnectinggrid->positiony.",
										positionz=".$zconnectinggrid->positionz.",
										scalingx=".$zconnectinggrid->scalingx.",
										scalingy=".$zconnectinggrid->scalingy.",
										scalingz=".$zconnectinggrid->scalingz.",
										rotationx=".$zconnectinggrid->rotationx.",
										rotationy=".$zconnectinggrid->rotationy.",
										rotationz=".$zconnectinggrid->rotationz.",
										loadactionzoneid='".$znewloadactionzoneid."',
										altloadactionzoneid='".$znewaltloadactionzoneid."',
										unloadactionzoneid='".$znewunloadactionzoneid."',
										attachactionzoneid='".$znewattachactionzoneid."',
										alttag='".$zconnectinggrid->alttag."',
										updatedatenow(),
										updateuserid='".$znewupdateuserid."'
									where connectinggridid='".$zfoundconnectinggridid."'
									limit 1;");
							} else {
							/* insert new record into connectinggrids table (additional 3D Webs in the current 3D Web) */
								$wtwhandlers->query("
									insert into ".wtw_tableprefix."connectinggrids 
									   (connectinggridid,
										pastconnectinggridid,
										parentwebid,
										parentwebtype,
										childwebid,
										childwebtype,
										positionx,
										positiony,
										positionz,
										scalingx,
										scalingy,
										scalingz,
										rotationx,
										rotationy,
										rotationz,
										loadactionzoneid,
										altloadactionzoneid,
										unloadactionzoneid,
										attachactionzoneid,
										alttag,
										createdate,
										createuserid,
										updatedate,
										updateuserid)
									values
									   ('".$znewconnectinggridid."',
										'".$zconnectinggrid->connectinggridid."',
										'".$zwebid."',
										'".$zconnectinggrid->parentwebtype."',
										'".$znewchildwebid."',
										'".$zconnectinggrid->childwebtype."',
										".$zconnectinggrid->positionx.",
										".$zconnectinggrid->positiony.",
										".$zconnectinggrid->positionz.",
										".$zconnectinggrid->scalingx.",
										".$zconnectinggrid->scalingy.",
										".$zconnectinggrid->scalingz.",
										".$zconnectinggrid->rotationx.",
										".$zconnectinggrid->rotationy.",
										".$zconnectinggrid->rotationz.",
										'".$znewloadactionzoneid."',
										'".$znewaltloadactionzoneid."',
										'".$znewunloadactionzoneid."',
										'".$znewattachactionzoneid."',
										'".$zconnectinggrid->alttag."',
										'".$zconnectinggrid->createdate."',
										'".$znewcreateuserid."',
										now(),
										'".$znewupdateuserid."');");
							}
							if ($zfetchweb) {
								/* assign newchildwebid, but also need to pass the webid... */
								$this->downloadWeb($zconnectinggrid->childwebid, $znewchildwebid, $zconnectinggrid->childwebtype, $zusertoken, $zwebid, $zconnectinggrid->parentwebtype, '', 0, 0, 0, 0);
							}
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUpdateWeb=".$e->getMessage());
		}
		return $zwebid;
	}

	public function updateDownloadsQueue($zdownloadid, $zwebid, $zwebtype, $zprocess) {
		/* update download queue - process 1 = done, 0 = cancel (delete) */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			$zfound = false;
			/* check to see if it is already there */
			$zresults = $wtwhandlers->query("
				select * 
				from ".wtw_tableprefix."downloads
				where webid='".$zwebid."'
					and webtype='".$zwebtype."'
					and downloadid='".$zdownloadid."'
					and deleted=0
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfound = true;
			}
			if ($zfound) {
				if ($zprocess == '1') {
					$wtwhandlers->query("
						update ".wtw_tableprefix."downloads
						set downloaddate=now(),
							downloaduserid='".$wtwhandlers->userid."',
							deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where downloadid='".$zdownloadid."'
						limit 1;
					");
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."downloads
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where downloadid='".$zdownloadid."'
						limit 1;
					");
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-updateDownloadsQueue=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadUsers($zrequestusers, $zusertoken) {
		/* process all users associated to this download (for your reference) */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestusers)) {
				$zrequestusers = json_decode($zrequestusers);
			} else {
				$zrequestusers = array();
			}
			foreach ($zrequestusers as $zuser) {
				/* check if the userid is already in use */
				$znewuserid = $wtwhandlers->getNewKey('users', 'userid', $zuser->userid);
				$znewuploadpathid = $wtwhandlers->getNewKey('users', "uploadpathid", $zuser->uploadpathid);
				$zuserpassword = $wtwhandlers->getRandomString(16,1);
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where userid='".$znewuserid."'
					limit 1;
					");
				if (count($zresults) == 0) {
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."users 
						   (userid,
							pastuserid,
							displayname,
							email,
							uploadpathid,
							userpassword,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewuserid."',
							'".$zuser->userid."',
							'".addslashes($zuser->displayname)."',
							'".$zuser->email."',
							'".$znewuploadpathid."',
							'".$zuserpassword."',
							now(),
							'".$znewuserid."',
							now(),
							'".$znewuserid."');");
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUsers=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function downloadUploads($zrequestuploads, $znewfolder, $znewurl, $zusertoken) {
		/* process all uploads related to this download */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestuploads)) {
				$zrequestuploads = json_decode($zrequestuploads);
			} else {
				$zrequestuploads = array();
			}
			foreach ($zrequestuploads as $zupload) {
				/* assign a new uploadid if it is already in use */
				$znewuploadid = $wtwhandlers->getNewKey('uploads', "uploadid", $zupload->uploadid);

				$zneworiginalid = '';
				$znewwebsizeid = '';
				$znewthumbnailid = '';
				$znewfileurl = '';
				
				/* each image has 3 associated records for original, websize, and thumbnail */
				if ($zupload->uploadid == $zupload->originalid) {
					$zneworiginalid = $znewuploadid;
				} else if ($zupload->uploadid == $zupload->websizeid) {
					$znewwebsizeid = $znewuploadid;
				} else if ($zupload->uploadid == $zupload->thumbnailid) {
					$znewthumbnailid = $znewuploadid;
				}
				
				/* each image gets its own new ID if the initial one is already in use */
				if (empty($zneworiginalid)) {
					$zneworiginalid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zupload->originalid);
				}
				if (empty($znewwebsizeid)) {
					$znewwebsizeid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zupload->websizeid);
				}
				if (empty($znewthumbnailid)) {
					$znewthumbnailid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zupload->thumbnailid);
				}
				
				$znewuploadsfolder = $znewfolder.'/uploads';
				$znewuploadsurl = $znewurl.'/uploads';
				$wtwhandlers->verifyFolderExists($znewuploadsfolder);
				if (!empty($zupload->filepath)) {
					try {
						/* check file types for valid downloads */
						$zfileext = strtolower(pathinfo($zupload->filepath, PATHINFO_EXTENSION));
						if ($zfileext == 'babylon' || $zfileext == 'manifest' || $zfileext == 'blend' || $zfileext == 'obj' || $zfileext == 'glb' || $zfileext == 'glbt' || $zfileext == 'fbx' || $zfileext == 'dae' || $zfileext == 'stl' || $zfileext == 'jpg' || $zfileext == 'jpeg' || $zfileext == 'bmp' || $zfileext == 'tif' || $zfileext == 'tiff' || $zfileext == 'png' || $zfileext == 'gif' || $zfileext == 'webp' || $zfileext == 'wav' || $zfileext == 'mp3' || $zfileext == 'mp4' || $zfileext == 'wma' || $zfileext == 'aac' || $zfileext == 'flac' || $zfileext == 'webm' || $zfileext == 'ogg' || $zfileext == 'mpg' || $zfileext == 'avi' || $zfileext == 'mov' || $zfileext == 'wmv' || $zfileext == 'flv' || $zfileext == 'swf' || $zfileext == 'mtl' || $zfileext == '3ds' || $zfileext == 'c4d' || $zfileext == 'txt' || $zfileext == 'log' || $zfileext == 'pdf') {
							/* download each file */
							file_put_contents($znewuploadsfolder.'/'.$zupload->filename, fopen($zupload->filepath, 'r'));
							umask(0);
							chmod($znewuploadsfolder.'/'.$zupload->filename, octdec(wtw_chmod));
							if (defined('wtw_umask')) {
								/* reset umask */
								if (wtw_umask != '0') {
									umask(octdec(wtw_umask));
								}
							}
							$znewfileurl = $znewuploadsurl.'/'.$zupload->filename;
						}
					} catch (Exception $e) {
						$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUploads-getfile=".$e->getMessage());
						$zresponse = array(
							'serror' => $e->getMessage()
						);
					}	
				}
				
				/* get new foreign keys */
				/* lookup foreign key values to new assigned values using "past" field prefix */
				$znewuserid = $wtwhandlers->getUserIDfromPastID($zupload->userid);
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zupload->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zupload->updateuserid);
				
				$zhidedate = "null";
				$zhide = "0";
				$zcheckeddate = "null";
				if (isset($zupload->hidedate)) {
					$zhidedate = "'".$zupload->hidedate."'";
				}
				if ($zupload->hide == 1) {
					$zhide = "1";
				}
				/* insert new record into uploads table */
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."uploads 
					   (uploadid,
						pastuploadid,
						originalid,
						websizeid,
						thumbnailid,
						userid,
						filetitle,
						filename,
						fileextension,
						filesize,
						filetype,
						filepath,
						filedata,
						imagewidth,
						imageheight,
						stock,
						hidedate,
						hideuserid,
						hide,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$znewuploadid."',
						'".$zupload->uploadid."',
						'".$zneworiginalid."',
						'".$znewwebsizeid."',
						'".$znewthumbnailid."',
						'".$znewuserid."',
						'".$zupload->filetitle."',
						'".$zupload->filename."',
						'".$zupload->fileextension."',
						".$zupload->filesize.",
						'".$zupload->filetype."',
						'".$znewfileurl."',
						'".$zupload->filedata."',
						".$zupload->imagewidth.",
						".$zupload->imageheight.",
						0,
						".$zhidedate.",
						'".$zupload->hideuserid."',
						".$zhide.",
						'".$zupload->createdate."',
						'".$znewcreateuserid."',
						now(),
						'".$znewupdateuserid."');");
				
				/* update foreign keys as needed */
				if (!empty($zneworiginalid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploads 
						set originalid='".$zneworiginalid."'
						where (pastuploadid='".$zupload->originalid."'
								or (websizeid='".$znewwebsizeid."' and not '".$znewwebsizeid."'='')
								or (thumbnailid='".$znewthumbnailid."' and not '".$znewthumbnailid."'=''))
							and originalid = '';");
				}
				if (!empty($znewwebsizeid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploads 
						set websizeid='".$znewwebsizeid."'
						where (pastuploadid = '".$zupload->websizeid."'
								or (originalid='".$zneworiginalid."' and not '".$zneworiginalid."'='')
								or (thumbnailid='".$znewthumbnailid."' and not '".$znewthumbnailid."'=''))
							and websizeid = '';");
				}
				if (!empty($znewthumbnailid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploads 
						set thumbnailid='".$znewthumbnailid."'
						where (pastuploadid='".$zupload->thumbnailid."'
								or (originalid='".$zneworiginalid."' and not '".$zneworiginalid."'='')
								or (websizeid='".$zneworiginalid."' and not '".$zneworiginalid."'=''))
							and thumbnailid = '';");
				}
			}
	
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUploads=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function downloadMainWeb($zrequest, $zwebtype, $znewwebid, $zdownloadparentwebtype, $zdownloadparentwebid, $zusertoken) {
		/* write main web record */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequest)) {
				$zrequest = json_decode($zrequest);
			} else {
				$zrequest = array();
			}
			/* get new foreign keys */
			$znewsnapshotid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zrequest->snapshotid);
			$znewuserid = $wtwhandlers->getUserIDfromPastID($zrequest->userid);
			$znewshareuserid = $wtwhandlers->getUserIDfromPastID($zrequest->shareuserid);
			$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
			$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
			
			switch($zwebtype) {
				case "community":
					/* get new foreign keys */
					$znewtextureid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zrequest->textureid);
					$znewskydomeid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zrequest->skydomeid);
					$zversionid = $zrequest->versionid;
					if ($zversionid == '0000000000000000') {
						$zversionid = $znewwebid;
					}
					
					/* insert new record into communities table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."communities 
						   (communityid,
							pastcommunityid,
							versionid,
							version,
							versionorder,
							versiondesc,
							downloadparentwebid,
							downloadparentwebtype,
							communityname,
							communitydescription,
							hostuserid,
							userid,
							positionx,
							positiony,
							positionz,
							scalingx,
							scalingy,
							scalingz,
							rotationx,
							rotationy,
							rotationz,
							gravity,
							groundpositiony,
							waterpositiony,
							waterbumpheight,
							watersubdivisions,
							windforce,
							winddirectionx,
							winddirectiony,
							winddirectionz,
							waterwaveheight,
							waterwavelength,
							watercolorrefraction,
							watercolorreflection,
							watercolorblendfactor,
							watercolorblendfactor2,
							wateralpha,
							waterbumpid,
							textureid,
							skydomeid,
							sceneambientcolor,
							sceneclearcolor,
							sceneuseclonedmeshmap,
							sceneblockmaterialdirtymechanism,
							scenefogenabled,
							scenefogmode,
							scenefogdensity,
							scenefogstart,
							scenefogend,
							scenefogcolor,
							sundirectionalintensity,
							sundiffusecolor,
							sunspecularcolor,
							sungroundcolor,
							sundirectionx,
							sundirectiony,
							sundirectionz,
							backlightintensity,
							backlightdirectionx,
							backlightdirectiony,
							backlightdirectionz,
							backlightdiffusecolor,
							backlightspecularcolor,
							skytype,
							skysize,
							skyboxfolder,
							skyboxfile,
							skyboximageleft,
							skyboximageup,
							skyboximagefront,
							skyboximageright,
							skyboximagedown,
							skyboximageback,
							skypositionoffsetx,
							skypositionoffsety,
							skypositionoffsetz,
							skyboxmicrosurface,
							skyboxpbr,
							skyboxasenvironmenttexture,
							skyboxblur,
							skyboxdiffusecolor,
							skyboxspecularcolor,
							skyboxambientcolor,
							skyboxemissivecolor,
							skyinclination,
							skyluminance,
							skyazimuth,
							skyrayleigh,
							skyturbidity,
							skymiedirectionalg,
							skymiecoefficient,
							templatename,
							tags,
							description,
							snapshotid,
							shareuserid,
							alttag,
							buildingpositionx,
							buildingpositiony,
							buildingpositionz,
							buildingscalingx,
							buildingscalingy,
							buildingscalingz,
							buildingrotationx,
							buildingrotationy,
							buildingrotationz,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewwebid."',
							'".$zrequest->communityid."',
							'".$zversionid."',
							'".$zrequest->version."',
							".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
							'".addslashes($zrequest->versiondesc)."',
							'".$zdownloadparentwebid."',
							'".$zdownloadparentwebtype."',
							'".$zrequest->communityname."',
							'".$zrequest->communitydescription."',
							'".$zhostuserid."',
							'".$zuserid."',
							".$wtwhandlers->checkNumber($zrequest->positionx,0).",
							".$wtwhandlers->checkNumber($zrequest->positiony,0).",
							".$wtwhandlers->checkNumber($zrequest->positionz,0).",
							".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
							".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
							".$wtwhandlers->checkNumber($zrequest->gravity,9.8).",
							".$wtwhandlers->checkNumber($zrequest->groundpositiony,0).",
							".$wtwhandlers->checkNumber($zrequest->waterpositiony,-1).",
							".$wtwhandlers->checkNumber($zrequest->waterbumpheight,.6).",
							".$wtwhandlers->checkNumber($zrequest->watersubdivisions,2).",
							".$wtwhandlers->checkNumber($zrequest->windforce,-10).",
							".$wtwhandlers->checkNumber($zrequest->winddirectionx,1).",
							".$wtwhandlers->checkNumber($zrequest->winddirectiony,0).",
							".$wtwhandlers->checkNumber($zrequest->winddirectionz,1).",
							".$wtwhandlers->checkNumber($zrequest->waterwaveheight,.2).",
							".$wtwhandlers->checkNumber($zrequest->waterwavelength,.02).",
							'".$zrequest->watercolorrefraction."',
							'".$zrequest->watercolorreflection."',
							".$wtwhandlers->checkNumber($zrequest->watercolorblendfactor,.2).",
							".$wtwhandlers->checkNumber($zrequest->watercolorblendfactor2,.2).",
							".$wtwhandlers->checkNumber($zrequest->wateralpha,.9).",
							'".$zrequest->waterbumpid."',
							'".$znewtextureid."',
							'".$znewskydomeid."',
							'".$zrequest->sceneambientcolor."',
							'".$zrequest->sceneclearcolor."',
							".$wtwhandlers->checkNumber($zrequest->sceneuseclonedmeshmap,1).",
							".$wtwhandlers->checkNumber($zrequest->sceneblockmaterialdirtymechanism,1).",
							".$wtwhandlers->checkNumber($zrequest->scenefogenabled,0).",
							'".$zrequest->scenefogmode."',
							".$wtwhandlers->checkNumber($zrequest->scenefogdensity,.01).",
							".$wtwhandlers->checkNumber($zrequest->scenefogstart,20).",
							".$wtwhandlers->checkNumber($zrequest->scenefogend,60).",
							'".$zrequest->scenefogcolor."',
							".$wtwhandlers->checkNumber($zrequest->sundirectionalintensity,1).",
							'".$zrequest->sundiffusecolor."',
							'".$zrequest->sunspecularcolor."',
							'".$zrequest->sungroundcolor."',
							".$wtwhandlers->checkNumber($zrequest->sundirectionx,999).",
							".$wtwhandlers->checkNumber($zrequest->sundirectiony,-999).",
							".$wtwhandlers->checkNumber($zrequest->sundirectionz,999).",
							".$wtwhandlers->checkNumber($zrequest->backlightintensity,.5).",
							".$wtwhandlers->checkNumber($zrequest->backlightdirectionx,-999).",
							".$wtwhandlers->checkNumber($zrequest->backlightdirectiony,999).",
							".$wtwhandlers->checkNumber($zrequest->backlightdirectionz,-999).",
							'".$zrequest->backlightdiffusecolor."',
							'".$zrequest->backlightspecularcolor."',
							'".$zrequest->skytype."',
							".$wtwhandlers->checkNumber($zrequest->skysize,5000).",
							'".$zrequest->skyboxfolder."',
							'".$zrequest->skyboxfile."',
							'".$zrequest->skyboximageleft."',
							'".$zrequest->skyboximageup."',
							'".$zrequest->skyboximagefront."',
							'".$zrequest->skyboximageright."',
							'".$zrequest->skyboximagedown."',
							'".$zrequest->skyboximageback."',
							".$wtwhandlers->checkNumber($zrequest->skypositionoffsetx,0).",
							".$wtwhandlers->checkNumber($zrequest->skypositionoffsety,0).",
							".$wtwhandlers->checkNumber($zrequest->skypositionoffsetz,0).",
							".$wtwhandlers->checkNumber($zrequest->skyboxmicrosurface,0).",
							".$wtwhandlers->checkNumber($zrequest->skyboxpbr,0).",
							".$wtwhandlers->checkNumber($zrequest->skyboxasenvironmenttexture,0).",
							".$wtwhandlers->checkNumber($zrequest->skyboxblur,0).",
							'".$zrequest->skyboxdiffusecolor."',
							'".$zrequest->skyboxspecularcolor."',
							'".$zrequest->skyboxambientcolor."',
							'".$zrequest->skyboxemissivecolor."',
							".$zrequest->skyinclination.",
							".$zrequest->skyluminance.",
							".$zrequest->skyazimuth.",
							".$zrequest->skyrayleigh.",
							".$zrequest->skyturbidity.",
							".$zrequest->skymiedirectionalg.",
							".$zrequest->skymiecoefficient.",
							'".$zrequest->templatename."',
							'".$zrequest->tags."',
							'".$zrequest->description."',
							'".$znewsnapshotid."',
							'".$znewshareuserid."',
							'".$zrequest->alttag."',
							".$wtwhandlers->checkNumber($zrequest->buildingpositionx,0).",
							".$wtwhandlers->checkNumber($zrequest->buildingpositiony,0).",
							".$wtwhandlers->checkNumber($zrequest->buildingpositionz,0).",
							".$wtwhandlers->checkNumber($zrequest->buildingscalingx,1).",
							".$wtwhandlers->checkNumber($zrequest->buildingscalingy,1).",
							".$wtwhandlers->checkNumber($zrequest->buildingscalingz,1).",
							".$wtwhandlers->checkNumber($zrequest->buildingrotationx,0).",
							".$wtwhandlers->checkNumber($zrequest->buildingrotationy,0).",
							".$wtwhandlers->checkNumber($zrequest->buildingrotationz,0).",
							now(),
							'".$zuserid."',
							now(),
							'".$zuserid."');");
							
					$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."userauthorizations
							(userauthorizationid,
							 userid,
							 communityid,
							 useraccess,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zuserauthorizationid."',
							 '".$zuserid."',
							 '".$znewwebid."',
							 'admin',
							 now(),
							 '".$zuserid."',
							 now(),
							 '".$zuserid."');");
					break;
				case "building":
					$zversionid = $zrequest->versionid;
					if ($zversionid == '1111111111111111') {
						$zversionid = $znewwebid;
					}

					/* insert new record into buildings table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."buildings 
						   (buildingid,
							pastbuildingid,
							versionid,
							version,
							versionorder,
							versiondesc,
							downloadparentwebid,
							downloadparentwebtype,
							buildingname,
							buildingdescription,
							hostuserid,
							userid,
							positionx,
							positiony,
							positionz,
							scalingx,
							scalingy,
							scalingz,
							rotationx,
							rotationy,
							rotationz,
							gravity,
							templatename,
							tags,
							description,
							snapshotid,
							shareuserid,
							alttag,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewwebid."',
							'".$zrequest->buildingid."',
							'".$zversionid."',
							'".$zrequest->version."',
							".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
							'".addslashes($zrequest->versiondesc)."',
							'".$zdownloadparentwebid."',
							'".$zdownloadparentwebtype."',
							'".$zrequest->buildingname."',
							'".$zrequest->buildingdescription."',
							'".$zhostuserid."',
							'".$zuserid."',
							".$wtwhandlers->checkNumber($zrequest->positionx,0).",
							".$wtwhandlers->checkNumber($zrequest->positiony,0).",
							".$wtwhandlers->checkNumber($zrequest->positionz,0).",
							".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
							".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
							".$wtwhandlers->checkNumber($zrequest->gravity,9.8).",
							'".$zrequest->templatename."',
							'".$zrequest->tags."',
							'".$zrequest->description."',
							'".$znewsnapshotid."',
							'".$znewshareuserid."',
							'".$zrequest->alttag."',
							now(),
							'".$zuserid."',
							now(),
							'".$zuserid."');");
					$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."userauthorizations
							(userauthorizationid,
							 userid,
							 buildingid,
							 useraccess,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zuserauthorizationid."',
							 '".$zuserid."',
							 '".$znewwebid."',
							 'admin',
							 now(),
							 '".$zuserid."',
							 now(),
							 '".$zuserid."');");
					break;
				case "thing":
					$zversionid = $zrequest->versionid;
					if ($zversionid == '2222222222222222') {
						$zversionid = $znewwebid;
					}
					/* insert new record into things table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."things 
						   (thingid,
							pastthingid,
							versionid,
							version,
							versionorder,
							versiondesc,
							downloadparentwebid,
							downloadparentwebtype,
							thingname,
							thingdescription,
							hostuserid,
							userid,
							positionx,
							positiony,
							positionz,
							scalingx,
							scalingy,
							scalingz,
							rotationx,
							rotationy,
							rotationz,
							gravity,
							templatename,
							tags,
							description,
							snapshotid,
							shareuserid,
							alttag,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewwebid."',
							'".$zrequest->thingid."',
							'".$zversionid."',
							'".$zrequest->version."',
							".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
							'".addslashes($zrequest->versiondesc)."',
							'".$zdownloadparentwebid."',
							'".$zdownloadparentwebtype."',
							'".$zrequest->thingname."',
							'".$zrequest->thingdescription."',
							'".$zhostuserid."',
							'".$zuserid."',
							".$wtwhandlers->checkNumber($zrequest->positionx,0).",
							".$wtwhandlers->checkNumber($zrequest->positiony,0).",
							".$wtwhandlers->checkNumber($zrequest->positionz,0).",
							".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
							".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
							".$wtwhandlers->checkNumber($zrequest->gravity,9.8).",
							'".$zrequest->templatename."',
							'".$zrequest->tags."',
							'".$zrequest->description."',
							'".$znewsnapshotid."',
							'".$znewshareuserid."',
							'".$zrequest->alttag."',
							now(),
							'".$zuserid."',
							now(),
							'".$zuserid."');");
					$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."userauthorizations
							(userauthorizationid,
							 userid,
							 thingid,
							 useraccess,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zuserauthorizationid."',
							 '".$zuserid."',
							 '".$znewwebid."',
							 'admin',
							 now(),
							 '".$zuserid."',
							 now(),
							 '".$zuserid."');");
					break;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadMainWeb=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadActionZonesAvatarAnimations($zrequestavataranimations, $znewfolder, $zusertoken) {
		/* process all avatar animations */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestavataranimations)) {
				$zrequestavataranimations = json_decode($zrequestavataranimations);
			} else {
				$zrequestavataranimations = array();
			}
			foreach ($zrequestavataranimations as $zavataranimation) {
			
				/* check if the avataranimationid is already in use */
				$znewavataranimationid = $wtwhandlers->getNewKey('avataranimations', "avataranimationid", $zavataranimation->avataranimationid);
				
				$znewanimationicon = '';
				
				$znewobjectfolder = $znewfolder.'/avataranimations';
				$wtwhandlers->verifyFolderExists($znewobjectfolder);
				if (!empty($zavataranimation->objectfolder) && !empty($zavataranimation->objectfile)) {
					$znewobjectfolder = $znewfolder.'/avataranimations/'.str_replace(".obj","",str_replace(".gltf","",str_replace(".glb","",str_replace(".babylon","",$zavataranimation->objectfile))));
					$wtwhandlers->verifyFolderExists($znewobjectfolder);
					$zfileext = strtolower(pathinfo($znewobjectfolder."/".$zavataranimation->objectfile, PATHINFO_EXTENSION));
					if ($zfileext == 'babylon') {
						try {
							file_put_contents($znewobjectfolder."/".$zavataranimation->objectfile, fopen($zavataranimation->objectfolder.$zavataranimation->objectfile, 'r'));
							umask(0);
							chmod($znewobjectfolder."/".$zavataranimation->objectfile, octdec(wtw_chmod));
							if (defined('wtw_umask')) {
								/* reset umask */
								if (wtw_umask != '0') {
									umask(octdec(wtw_umask));
								}
							}
						} catch (Exception $e) {
							$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadActionZonesAvatarAnimations-getfile-babylon=".$e->getMessage());
							$zresponse = array(
								'serror' => $e->getMessage()
							);
						}	
						try {
							file_put_contents($znewobjectfolder."/".$zavataranimation->objectfile.".manifest", fopen($zavataranimation->objectfolder.$zavataranimation->objectfile.".manifest", 'r'));
							umask(0);
							chmod($znewobjectfolder."/".$zavataranimation->objectfile.".manifest", octdec(wtw_chmod));
							if (defined('wtw_umask')) {
								/* reset umask */
								if (wtw_umask != '0') {
									umask(octdec(wtw_umask));
								}
							}
						} catch (Exception $e) {
							$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadActionZonesAvatarAnimations-getfile-manifest=".$e->getMessage());
							$zresponse = array(
								'serror' => $e->getMessage()
							);
						}	
						
						if (!empty($zavataranimation->animationicon)) {
							try {
								$ziconfilename = basename($zavataranimation->animationicon);  
								$znewanimationicon = $znewobjectfolder."/".$ziconfilename;
								file_put_contents($znewanimationicon, fopen($zavataranimation->animationicon, 'r'));
								umask(0);
								chmod($znewanimationicon, octdec(wtw_chmod));
								if (defined('wtw_umask')) {
									/* reset umask */
									if (wtw_umask != '0') {
										umask(octdec(wtw_umask));
									}
								}
							} catch (Exception $e) {
								$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadActionZonesAvatarAnimations-getfile-icon=".$e->getMessage());
								$zresponse = array(
									'serror' => $e->getMessage()
								);
							}	
						}
					}
				}
				
				/* get new foreign keys */
				$znewsoundid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zavataranimation->soundid);
				
				$znewuserid = $wtwhandlers->getUserIDfromPastID($zavataranimation->userid);
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zavataranimation->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zavataranimation->updateuserid);
				
				/* insert new record into avataranimations table */
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."avataranimations 
					   (avataranimationid,
						pastavataranimationid,
						userid,
						loadpriority,
						animationevent,
						animationfriendlyname,
						animationicon,
						objectfolder,
						objectfile,
						startframe,
						endframe,
						animationloop,
						speedratio,
						soundid,
						soundmaxdistance,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$znewavataranimationid."',
						'".$zavataranimation->avataranimationid."',
						'".$znewuserid."',
						".$wtwhandlers->checkNumber($zavataranimation->loadpriority,25).",
						'".$zavataranimation->animationevent."',
						'".$zavataranimation->animationfriendlyname."',
						'".$znewanimationicon."',
						'".$znewobjectfolder."',
						'".$zavataranimation->objectfile."',
						".$wtwhandlers->checkNumber($zavataranimation->startframe,1).",
						".$wtwhandlers->checkNumber($zavataranimation->endframe,1).",
						".$wtwhandlers->checkNumber($zavataranimation->animationloop,1).",
						".$wtwhandlers->checkNumber($zavataranimation->speedratio,1).",
						'".$znewsoundid."',
						".$wtwhandlers->checkNumber($zavataranimation->soundmaxdistance,100).",
						'".$zavataranimation->createdate."',
						'".$znewcreateuserid."',
						now(),
						'".$znewupdateuserid."');");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadActionZonesAvatarAnimations=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadActionZones($zrequestactionzones, $znewcommunityid, $znewbuildingid, $znewthingid, $zusertoken) {
		/* process all action zones */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestactionzones)) {
				$zrequestactionzones = json_decode($zrequestactionzones);
			} else {
				$zrequestactionzones = array();
			}
			/* process all action zones */
			foreach ($zrequestactionzones as $zactionzone) {
				/* check if the actionzoneid is already in use */
				$znewactionzoneid = $wtwhandlers->getNewKey('actionzones', "actionzoneid", $zactionzone->actionzoneid);
				
				/* get new foreign keys */
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zactionzone->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zactionzone->updateuserid);
				
				/* insert new record into actionzones table */
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."actionzones 
					   (actionzoneid,
						pastactionzoneid,
						communityid,
						buildingid,
						thingid,
						attachmoldid,
						loadactionzoneid,
						parentactionzoneid,
						teleportwebid,
						teleportwebtype,
						spawnactionzoneid,
						actionzonename,
						actionzonetype,
						actionzoneshape,
						movementtype,
						movementdistance,
						positionx,
						positiony,
						positionz,
						scalingx,
						scalingy,
						scalingz,
						rotationx,
						rotationy,
						rotationz,
						axispositionx,
						axispositiony,
						axispositionz,
						axisrotationx,
						axisrotationy,
						axisrotationz,
						rotateaxis,
						rotatedegrees,
						rotatedirection,
						rotatespeed,
						value1,
						value2,
						defaulteditform,
						jsfunction,
						jsparameters,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$znewactionzoneid."',
						'".$zactionzone->actionzoneid."',
						'".$znewcommunityid."',
						'".$znewbuildingid."',
						'".$znewthingid."',
						'".$zactionzone->attachmoldid."',
						'".$zactionzone->loadactionzoneid."',
						'".$zactionzone->parentactionzoneid."',
						'".$zactionzone->teleportwebid."',
						'".$zactionzone->teleportwebtype."',
						'".$zactionzone->spawnactionzoneid."',
						'".$zactionzone->actionzonename."',
						'".$zactionzone->actionzonetype."',
						'".$zactionzone->actionzoneshape."',
						'".$zactionzone->movementtype."',
						".$zactionzone->movementdistance.",				
						".$zactionzone->positionx.",
						".$zactionzone->positiony.",
						".$zactionzone->positionz.",
						".$zactionzone->scalingx.",
						".$zactionzone->scalingy.",
						".$zactionzone->scalingz.",
						".$zactionzone->rotationx.",
						".$zactionzone->rotationy.",
						".$zactionzone->rotationz.",
						".$zactionzone->axispositionx.",
						".$zactionzone->axispositiony.",
						".$zactionzone->axispositionz.",
						".$zactionzone->axisrotationx.",
						".$zactionzone->axisrotationy.",
						".$zactionzone->axisrotationz.",
						'".$zactionzone->rotateaxis."',
						".$zactionzone->rotatedegrees.",
						".$zactionzone->rotatedirection.",
						".$zactionzone->rotatespeed.",
						".$zactionzone->value1.",
						".$zactionzone->value2.",
						".$zactionzone->defaulteditform.",
						'".$zactionzone->jsfunction."',
						'".$zactionzone->jsparameters."',
						'".$zactionzone->createdate."',
						'".$znewcreateuserid."',
						now(),
						'".$znewupdateuserid."');");
					
				foreach ($zactionzone->animations as $zazanimation) {
					/* check if the actionzoneanimationid is already in use */
					$znewactionzoneanimationid = $wtwhandlers->getNewKey('actionzoneanimations', "actionzoneanimationid", $zazanimation->actionzoneanimationid);
					
					/* get new foreign keys */
					$znewavataranimationid = $wtwhandlers->getIDByPastID('avataranimations', 'avataranimationid', 'pastavataranimationid', $zazanimation->avataranimationid);
					
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zazanimation->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zazanimation->updateuserid);
					
					/* insert new record into actionzoneanimations table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."actionzoneanimations 
						   (actionzoneanimationid,
							pastactionzoneanimationid,
							actionzoneid,
							communityid,
							buildingid,
							thingid,
							avataranimationid,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewactionzoneanimationid."',
							'".$zazanimation->actionzoneanimationid."',
							'".$znewactionzoneid."',
							'".$znewcommunityid."',
							'".$znewbuildingid."',
							'".$znewthingid."',
							'".$znewavataranimationid."',
							'".$zazanimation->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");	
					
				}
			}

			/* process action zone foreign action zones */
			$zresults = $wtwhandlers->query("
				select *  from ".wtw_tableprefix."actionzones 
				where communityid='".$znewcommunityid."'
					and buildingid='".$znewbuildingid."'
					and thingid='".$znewthingid."';");
			foreach ($zresults as $zrow) {
				/* get new foreign keys */
				$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zrow["loadactionzoneid"]);
				$znewparentactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zrow["parentactionzoneid"]);
				$znewspawnactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zrow["spawnactionzoneid"]);

				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set loadactionzoneid='".$znewloadactionzoneid."',
						parentactionzoneid='".$znewparentactionzoneid."',
						spawnactionzoneid='".$znewspawnactionzoneid."'
					where actionzoneid='".$zrow["actionzoneid"]."'
					limit 1;");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadActionZones=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadScripts($zrequestscripts, $znewfolder, $zusertoken) {
		/* process all scripts */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestscripts)) {
				$zrequestscripts = json_decode($zrequestscripts);
			} else {
				$zrequestscripts = array();
			}
			/* process all scripts */
			foreach ($zrequestscripts as $zscript) {
			
				/* check if the scriptid is already in use */
				$znewscriptid = $wtwhandlers->getNewKey('scripts', "scriptid", $zscript->scriptid);
				
				$znewscriptfolder = $znewfolder.'/scripts';
				$wtwhandlers->verifyFolderExists($znewscriptfolder);
				if (!empty($zscript->scriptpath)) {
					$zfileext = strtolower(pathinfo($znewscriptfolder."/".$zscript->scriptfilename, PATHINFO_EXTENSION));
					if ($zfileext == 'js') {
						try {
							file_put_contents($znewscriptfolder."/".$zscript->scriptfilename, fopen($zscript->scriptpath, 'r'));
							umask(0);
							chmod($znewscriptfolder."/".$zscript->scriptfilename, octdec(wtw_chmod));
							if (defined('wtw_umask')) {
								/* reset umask */
								if (wtw_umask != '0') {
									umask(octdec(wtw_umask));
								}
							}
						} catch (Exception $e) {
							$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadWeb-getfile-js=".$e->getMessage());
							$zresponse = array(
								'serror' => $e->getMessage()
							);
						}	
					}
				}
				
				/* get new foreign keys */
				$znewactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zscript->actionzoneid);
				
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zscript->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zscript->updateuserid);
				
				/* insert new record into scripts table */
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."scripts 
					   (scriptid,
						pastscriptid,
						actionzoneid,
						webtype,
						scriptname,
						scriptpath,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$znewscriptid."',
						'".$zscript->scriptid."',
						'".$znewactionzoneid."',
						'".$zscript->webtype."',
						'".$zscript->scriptname."',
						'".$znewscriptfolder."/".$zscript->scriptfilename."',
						'".$zscript->createdate."',
						'".$znewcreateuserid."',
						now(),
						'".$znewupdateuserid."');");		
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadScripts=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadConnectingGrids($zrequestconnectinggrids, $znewwebid, $zusertoken) {
		/* process all connecting grids */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestconnectinggrids)) {
				$zrequestconnectinggrids = json_decode($zrequestconnectinggrids);
			} else {
				$zrequestconnectinggrids = array();
			}
			/* process parent connecting grids */
			foreach ($zrequestconnectinggrids as $zconnectinggrid) {
				/* check if the connectinggridid is already in use */
				$znewconnectinggridid = $wtwhandlers->getNewKey('connectinggrids', "connectinggridid", $zconnectinggrid->connectinggridid);
				
				/* get new foreign keys */
				$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->loadactionzoneid);
				$znewaltloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->altloadactionzoneid);
				$znewunloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->unloadactionzoneid);
				$znewattachactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->attachactionzoneid);
				
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->updateuserid);
				
				/* insert new record into connectinggrids table */
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."connectinggrids 
					   (connectinggridid,
						pastconnectinggridid,
						parentwebid,
						parentwebtype,
						childwebid,
						childwebtype,
						positionx,
						positiony,
						positionz,
						scalingx,
						scalingy,
						scalingz,
						rotationx,
						rotationy,
						rotationz,
						loadactionzoneid,
						altloadactionzoneid,
						unloadactionzoneid,
						attachactionzoneid,
						alttag,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$znewconnectinggridid."',
						'".$zconnectinggrid->connectinggridid."',
						'',
						'".$zconnectinggrid->parentwebtype."',
						'".$znewwebid."',
						'".$zconnectinggrid->childwebtype."',
						".$zconnectinggrid->positionx.",
						".$zconnectinggrid->positiony.",
						".$zconnectinggrid->positionz.",
						".$zconnectinggrid->scalingx.",
						".$zconnectinggrid->scalingy.",
						".$zconnectinggrid->scalingz.",
						".$zconnectinggrid->rotationx.",
						".$zconnectinggrid->rotationy.",
						".$zconnectinggrid->rotationz.",
						'".$znewloadactionzoneid."',
						'".$znewaltloadactionzoneid."',
						'".$znewunloadactionzoneid."',
						'".$znewattachactionzoneid."',
						'".$zconnectinggrid->alttag."',
						'".$zconnectinggrid->createdate."',
						'".$znewcreateuserid."',
						now(),
						'".$znewupdateuserid."');");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadConnectingGrids=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadContentRatings($zrequestcontentratings, $znewwebid, $zusertoken) {
		/* process content ratings */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestcontentratings)) {
				$zrequestcontentratings = json_decode($zrequestcontentratings);
			} else {
				$zrequestcontentratings = array();
			}
			/* process content ratings */
			foreach ($zrequestcontentratings as $zcontentrating) {
				/* check if the contentratingid is already in use */
				$znewcontentratingid = $wtwhandlers->getNewKey('contentratings', "contentratingid", $zcontentrating->contentratingid);
				
				/* get new foreign keys */
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->updateuserid);
				
				/* insert new record into contentratings table */
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."contentratings 
					   (contentratingid,
						pastcontentratingid,
						webid,
						webtype,
						rating,
						ratingvalue,
						contentwarning,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$znewcontentratingid."',
						'".$zcontentrating->contentratingid."',
						'".$znewwebid."',
						'".$zcontentrating->webtype."',
						'".$zcontentrating->rating."',
						".$zcontentrating->ratingvalue.",
						'".$zcontentrating->contentwarning."',
						'".$zcontentrating->createdate."',
						'".$znewcreateuserid."',
						now(),
						'".$znewupdateuserid."');");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadContentRatings=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadPluginsRequired($zrequestpluginsrequired, $znewwebid, $zusertoken) {
		/* process plugins required */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestpluginsrequired)) {
				$zrequestpluginsrequired = json_decode($zrequestpluginsrequired);
			} else {
				$zrequestpluginsrequired = array();
			}
			/* process plugins required */
			foreach ($zrequestpluginsrequired as $zpluginrequired) {
				/* check if the pluginsrequiredid is already in use */
				$znewpluginsrequiredid = $wtwhandlers->getNewKey('pluginsrequired', "pluginsrequiredid", $zpluginrequired->pluginsrequiredid);
				
				/* get new foreign keys */
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zpluginrequired->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zpluginrequired->updateuserid);
				$zoptional = '0';
				if ($wtwhandlers->hasValue($zpluginrequired->optional)) {
					if ($zpluginrequired->optional == '1') {
						$zoptional = '1';
					}
				}
				
				/* insert new record into pluginsrequired table */
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."pluginsrequired 
					   (pluginsrequiredid,
						pastpluginsrequiredid,
						webid,
						webtype,
						pluginname,
						optional,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$znewpluginsrequiredid."',
						'".$zpluginrequired->pluginsrequiredid."',
						'".$znewwebid."',
						'".$zpluginrequired->webtype."',
						'".$zpluginrequired->pluginname."',
						".$zoptional.",
						'".$zpluginrequired->createdate."',
						'".$znewcreateuserid."',
						now(),
						'".$znewupdateuserid."');");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadPluginsRequired=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadUploadObjects($zrequestuploadobjects, $znewfolder, $znewurl, $zusertoken) {
		/* process uploaded objects */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			/* create array of uploadobjects to update the groupid after they are all added to the table (next section) */
			if (isset($zrequestuploadobjects)) {
				$zrequestuploadobjects = json_decode($zrequestuploadobjects);
			} else {
				$zrequestuploadobjects = array();
			}
			$i = 0;
			$zgroups = array();
			/* process uploaded objects */
			foreach ($zrequestuploadobjects as $zuploadobject) {
				$znewuploadobjectid = $wtwhandlers->getNewKey('uploadobjects', "uploadobjectid", $zuploadobject->uploadobjectid);
				$zgroupid = $zuploadobject->groupid;
				if (!isset($zgroupid) || empty($zgroupid)) {
					/* set to old id, will be updated in next section */
					$zgroupid = $zuploadobject->uploadobjectid;
				}
				$zgroups[$i] = array(
					'uploadobjectid'=>$zuploadobject->uploadobjectid,
					'pastuploadobjectid'=>$znewuploadobjectid,
					'groupid'=>$zgroupid
				);
				$i += 1;

				if ($wtwhandlers->hasValue($zuploadobject->uploadobjectid)) {
					$znewobjectfolder = $znewfolder.'/objects';
					$wtwhandlers->verifyFolderExists($znewobjectfolder);
					$znewobjectfolder = $znewfolder.'/objects/'.str_replace(".obj","",str_replace(".gltf","",str_replace(".glb","",str_replace(".babylon","",$zuploadobject->objectfile))));
					$wtwhandlers->verifyFolderExists($znewobjectfolder);
					$znewobjecturl = $znewurl.'/objects/'.str_replace(".obj","",str_replace(".gltf","",str_replace(".glb","",str_replace(".babylon","",$zuploadobject->objectfile))))."/";
					
					/* get new foreign keys */
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zuploadobject->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobject->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobject->updateuserid);
					
					/* insert new record into uploadobjects table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."uploadobjects 
						   (uploadobjectid,
							pastuploadobjectid,
							groupid,
							hostuserid,
							userid,
							objectfolder,
							objectfile,
							stock,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewuploadobjectid."',
							'".$zuploadobject->uploadobjectid."',
							'".$zgroupid."',
							'".$zhostuserid."',
							'".$zuserid."',
							'".$znewobjecturl."',
							'".$zuploadobject->objectfile."',
							".$zuploadobject->stock.",
							'".$zuploadobject->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
					
					foreach($zuploadobject->objectfiles as $zfile) {
						try {
							$zfileext = strtolower(pathinfo($zfile->filepath, PATHINFO_EXTENSION));
							if ($zfileext == 'babylon' || $zfileext == 'manifest' || $zfileext == 'blend' || $zfileext == 'obj' || $zfileext == 'glb' || $zfileext == 'glbt' || $zfileext == 'fbx' || $zfileext == 'dae' || $zfileext == 'stl' || $zfileext == 'jpg' || $zfileext == 'jpeg' || $zfileext == 'bmp' || $zfileext == 'tif' || $zfileext == 'tiff' || $zfileext == 'png' || $zfileext == 'gif' || $zfileext == 'webp' || $zfileext == 'wav' || $zfileext == 'mp3' || $zfileext == 'mp4' || $zfileext == 'wma' || $zfileext == 'aac' || $zfileext == 'flac' || $zfileext == 'webm' || $zfileext == 'ogg' || $zfileext == 'mpg' || $zfileext == 'avi' || $zfileext == 'mov' || $zfileext == 'wmv' || $zfileext == 'flv' || $zfileext == 'swf' || $zfileext == 'mtl' || $zfileext == '3ds' || $zfileext == 'c4d' || $zfileext == 'txt' || $zfileext == 'log' || $zfileext == 'pdf') {
								file_put_contents($znewobjectfolder.'/'.$zfile->filename, fopen($zfile->filepath, 'r'));
								umask(0);
								chmod($znewobjectfolder.'/'.$zfile->filename, octdec(wtw_chmod));
								if (defined('wtw_umask')) {
									/* reset umask */
									if (wtw_umask != '0') {
										umask(octdec(wtw_umask));
									}
								}
							}
						} catch (Exception $e) {
							$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUploadObjects-getfiles=".$e->getMessage());
							$zresponse = array(
								'serror' => $e->getMessage()
							);
						}	
					}
					
					
					/* process upload object animations */
					foreach ($zuploadobject->uploadobjectanimations as $zuploadobjectanimation) {
					
						/* check if the upload object animation id (objectanimationid) is already in use */
						$znewobjectanimationid = $wtwhandlers->getNewKey('uploadobjectanimations', "objectanimationid", $zuploadobjectanimation->objectanimationid);
						
						/* get new foreign keys */
						$znewsoundid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zuploadobjectanimation->soundid);
						
						$znewuserid = $wtwhandlers->getUserIDfromPastID($zuploadobjectanimation->userid);
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobjectanimation->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobjectanimation->updateuserid);
						
						/* insert new record into uploadobjectanimations table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."uploadobjectanimations 
							   (objectanimationid,
								pastobjectanimationid,
								uploadobjectid,
								userid,
								animationname,
								moldnamepart,
								moldevent,
								startframe,
								endframe,
								animationloop,
								speedratio,
								animationendscript,
								animationendparameters,
								stopcurrentanimations,
								additionalscript,
								additionalparameters,
								soundid,
								soundmaxdistance,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewobjectanimationid."',
								'".$zuploadobjectanimation->objectanimationid."',
								'".$znewuploadobjectid."',
								'".$znewuserid."',
								'".$zuploadobjectanimation->animationname."',
								'".$zuploadobjectanimation->moldnamepart."',
								'".$zuploadobjectanimation->moldevent."',
								".$zuploadobjectanimation->startframe.",
								".$zuploadobjectanimation->endframe.",
								".$zuploadobjectanimation->animationloop.",
								".$zuploadobjectanimation->speedratio.",
								'".$zuploadobjectanimation->animationendscript."',
								'".$zuploadobjectanimation->animationendparameters."',
								".$zuploadobjectanimation->stopcurrentanimations.",
								'".$zuploadobjectanimation->additionalscript."',
								'".$zuploadobjectanimation->additionalparameters."',
								'".$znewsoundid."',
								".$zuploadobjectanimation->soundmaxdistance.",
								'".$zuploadobjectanimation->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");
					}
				}
			}
			/* update groupid to new uploadobjectid based */
			foreach ($zgroups as $zgroup) {
				$znewgroupid = $zgroup['uploadobjectid'];
				$zresults = $wtwhandlers->query("
					select uploadobjectid
					from ".wtw_tableprefix."uploadobjects
					where pastuploadobjectid='".$zgroup['groupid']."'
						and deleted=0
					order by updatedate desc
					limit 1;
				");
				foreach ($zresults as $zrow) {
					$znewgroupid = $zrow['uploadobjectid'];
				}
				if (!isset($znewgroupid) || empty($znewgroupid)) {
					$znewgroupid = $zgroup['uploadobjectid'];
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."uploadobjects
					set groupid='".$znewgroupid."'
					where uploadobjectid='".$zgroup['uploadobjectid']."';
				");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUploadObjects=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadMolds($zrequestmolds, $zwebtype, $znewwebid, $zusertoken) {
		/* process all molds and mold dependents (moldpoints and webimages) */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$znewcommunityid = '';
			$znewbuildingid = '';
			$znewthingid = '';
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}
			
			if (isset($zrequestmolds)) {
				$zrequestmolds = json_decode($zrequestmolds);
			} else {
				$zrequestmolds = array();
			}
			/* process all molds */
			foreach ($zrequestmolds as $zmold) {
				/* check if the moldid is already in use */
				$znewmoldid = '';
				$zsql = '';
				$zsqlvalues = '';
				switch($zwebtype) {
					case "community":
						$znewcommunityid = $znewwebid;
						$znewmoldid = $wtwhandlers->getNewKey($zwebtype.'molds', $zwebtype.'moldid', $zmold->communitymoldid);
						/* insert new record into communitymolds table */
						$zsql = "insert into ".wtw_tableprefix."communitymolds
						   (communitymoldid,
							pastcommunitymoldid,
							communityid,";
						$zsqlvalues = "('".$znewmoldid."',
							'".$zmold->communitymoldid."',
							'".$znewcommunityid."',";
						break;
					case "building":
						$znewbuildingid = $znewwebid;
						$znewmoldid = $wtwhandlers->getNewKey($zwebtype.'molds', $zwebtype.'moldid', $zmold->buildingmoldid);
						/* insert new record into buildingmolds table */
						$zsql = "insert into ".wtw_tableprefix."buildingmolds
						   (buildingmoldid,
							pastbuildingmoldid,
							buildingid,";
						$zsqlvalues = "('".$znewmoldid."',
							'".$zmold->buildingmoldid."',
							'".$znewbuildingid."',";
						break;
					case "thing":
						$znewthingid = $znewwebid;
						$znewmoldid = $wtwhandlers->getNewKey($zwebtype.'molds', $zwebtype.'moldid', $zmold->thingmoldid);
						/* insert new record into thingmolds table */
						$zsql = "insert into ".wtw_tableprefix."thingmolds
						   (thingmoldid,
							pastthingmoldid,
							thingid,";
						$zsqlvalues = "('".$znewmoldid."',
							'".$zmold->pastthingmoldid."',
							'".$znewthingid."',";
						break;
				}

				if (!empty($zsql)) {
					$znewtextureid = '';
					$znewtexturebumpid = '';
					$znewtexturehoverid = '';
					$znewvideoid = '';
					$znewvideoposterid = '';
					$znewheightmapid = '';
					$znewmixmapid = '';
					$znewtexturerid = '';
					$znewtexturegid = '';
					$znewtexturebid = '';
					$znewtexturebumprid = '';
					$znewtexturebumpgid = '';
					$znewtexturebumpbid = '';
					$znewsoundid = '';
					$znewtextureid = '';
					
					/* get new foreign keys */
					$znewtextureid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->textureid);
					$znewtexturebumpid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumpid);
					$znewtexturehoverid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturehoverid);
					$znewvideoid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->videoid);
					$znewvideoposterid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->videoposterid);
					$znewheightmapid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->heightmapid);
					$znewmixmapid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->mixmapid);
					$znewtexturerid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturerid);
					$znewtexturegid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturegid);
					$znewtexturebid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebid);
					$znewtexturebumprid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumprid);
					$znewtexturebumpgid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumpgid);
					$znewtexturebumpbid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumpbid);
					$znewsoundid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->soundid);

					$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zmold->loadactionzoneid);
					$znewunloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zmold->unloadactionzoneid);
					$znewactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zmold->actionzoneid);
					
					$znewuploadobjectid = $wtwhandlers->getIDByPastID('uploadobjects', 'uploadobjectid', 'pastuploadobjectid', $zmold->uploadobjectid);
					
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zmold->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zmold->updateuserid);
					
					/* remainder fo the common fields for communitymolds, buildingmolds, and thingmolds */
					$zsql .= "
						loadactionzoneid,
						unloadactionzoneid,
						shape,
						covering,
						positionx,
						positiony,
						positionz,
						scalingx,
						scalingy,
						scalingz,
						rotationx,
						rotationy,
						rotationz,
						special1,
						special2,
						uoffset,
						voffset,
						uscale,
						vscale,
						uploadobjectid,
						graphiclevel,
						textureid,
						texturebumpid,
						texturehoverid,
						videoid,
						videoposterid,
						diffusecolor,
						specularcolor,
						emissivecolor,
						ambientcolor,
						heightmapid,
						mixmapid,
						texturerid,
						texturegid,
						texturebid,
						texturebumprid,
						texturebumpgid,
						texturebumpbid,
						soundid,
						soundname,
						soundattenuation,
						soundloop,
						soundmaxdistance,
						soundrollofffactor,
						soundrefdistance,
						soundconeinnerangle,
						soundconeouterangle,
						soundconeoutergain,
						webtext,
						webstyle,
						opacity,
						sideorientation,
						billboard,
						waterreflection,
						receiveshadows,
						subdivisions,
						minheight,
						maxheight,
						checkcollisions,
						ispickable,
						actionzoneid,
						csgmoldid,
						csgaction,
						alttag,
						jsfunction,
						jsparameters,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
						values ";
					
					$zsqlvalues .= "
						'".$znewloadactionzoneid."',
						'".$znewunloadactionzoneid."',
						'".$zmold->shape."',
						'".$zmold->covering."',
						".$zmold->positionx.",
						".$zmold->positiony.",
						".$zmold->positionz.",
						".$zmold->scalingx.",
						".$zmold->scalingy.",
						".$zmold->scalingz.",
						".$zmold->rotationx.",
						".$zmold->rotationy.",
						".$zmold->rotationz.",
						".$zmold->special1.",
						".$zmold->special2.",
						".$zmold->uoffset.",
						".$zmold->voffset.",
						".$zmold->uscale.",
						".$zmold->vscale.",
						'".$znewuploadobjectid."',
						".$zmold->graphiclevel.",
						'".$znewtextureid."',
						'".$znewtexturebumpid."',
						'".$znewtexturehoverid."',
						'".$znewvideoid."',
						'".$znewvideoposterid."',
						'".$zmold->diffusecolor."',
						'".$zmold->specularcolor."',
						'".$zmold->emissivecolor."',
						'".$zmold->ambientcolor."',
						'".$znewheightmapid."',
						'".$znewmixmapid."',
						'".$znewtexturerid."',
						'".$znewtexturegid."',
						'".$znewtexturebid."',
						'".$znewtexturebumprid."',
						'".$znewtexturebumpgid."',
						'".$znewtexturebumpbid."',
						'".$znewsoundid."',
						'".$zmold->soundname."',
						'".$zmold->soundattenuation."',
						".$zmold->soundloop.",
						".$zmold->soundmaxdistance.",
						".$zmold->soundrollofffactor.",
						".$zmold->soundrefdistance.",
						".$zmold->soundconeinnerangle.",
						".$zmold->soundconeouterangle.",
						".$zmold->soundconeoutergain.",
						'".$zmold->webtext."',
						'".$zmold->webstyle."',
						".$zmold->opacity.",
						'".$zmold->sideorientation."',
						".$zmold->billboard.",
						".$zmold->waterreflection.",
						".$zmold->receiveshadows.",
						".$zmold->subdivisions.",
						".$zmold->minheight.",
						".$zmold->maxheight.",
						".$zmold->checkcollisions.",
						".$zmold->ispickable.",
						'".$znewactionzoneid."',
						'".$zmold->csgmoldid."',
						'".$zmold->csgaction."',
						'".$zmold->alttag."',
						'".$zmold->jsfunction."',
						'".$zmold->jsparameters."',
						'".$zmold->createdate."',
						'".$znewcreateuserid."',
						now(),
						'".$znewupdateuserid."');";

					$wtwhandlers->query($zsql.$zsqlvalues);
					
					
					/*  get mold points */
					foreach ($zmold->moldpoints as $zmoldpoint) {
						$znewmoldpointid = $wtwhandlers->getNewKey('moldpoints', 'moldpointid', $zmoldpoint->moldpointid);
						
						/* get new foreign keys */
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zmoldpoint->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zmoldpoint->updateuserid);
						
						/* insert new record into moldpoints table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."moldpoints 
							   (moldpointid,
								pastmoldpointid,
								moldid,
								pathnumber,
								sorder,
								positionx,
								positiony,
								positionz,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewmoldpointid."',
								'".$zmoldpoint->moldpointid."',
								'".$znewmoldid."',
								".$zmoldpoint->pathnumber.",
								".$zmoldpoint->sorder.",
								".$zmoldpoint->positionx.",
								".$zmoldpoint->positiony.",
								".$zmoldpoint->positionz.",
								'".$zmoldpoint->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");
					}
					
					
					/* process csg molds */
					$zresults = $wtwhandlers->query("
						select *  from ".wtw_tableprefix.$zwebtype."molds 
						where ".$zwebtype."moldid='".$znewmoldid."'
							and not csgmoldid='';");
					foreach ($zresults as $zrow) {
						/* get new foreign keys */
						$znewcsgmoldid = $wtwhandlers->getIDByPastID($zwebtype.'molds', $zwebtype.'moldid', 'past'.$zwebtype.'moldid', $zrow["csgmoldid"]);
						
						$wtwhandlers->query("
							update ".wtw_tableprefix.$zwebtype."molds
							set csgmoldid='".$znewcsgmoldid."'
							where ".$zwebtype."moldid='".$zrow[$zwebtype."moldid"]."'
								and not csgmoldid=''
							limit 1;");
					}


					/* process action zone attach molds */
					$zresults = $wtwhandlers->query("
						select *  from ".wtw_tableprefix."actionzones 
						where ".$zwebtype."id='".$znewwebid."'
							and not attachmoldid='';");
					foreach ($zresults as $zrow) {
						/* get new foreign keys */
						$znewattachmoldid = $wtwhandlers->getIDByPastID($zwebtype.'molds', $zwebtype.'moldid', 'past'.$zwebtype.'moldid', $zrow["attachmoldid"]);
						
						$wtwhandlers->query("
							update ".wtw_tableprefix."actionzones
							set attachmoldid='".$znewattachmoldid."'
							where actionzoneid='".$zrow["actionzoneid"]."'
								and not attachmoldid=''
							limit 1;");
					}


					/* get webimages */
					foreach ($zmold->webimages as $zwebimage) {
						$znewwebimageid = $wtwhandlers->getNewKey('webimages', 'webimageid', $zwebimage->webimageid);

						$znewcommunitymoldid = '';
						$znewbuildingmoldid = '';
						$znewthingmoldid = '';
						switch ($zwebtype) {
							case 'community':
								$znewcommunitymoldid = $znewmoldid;
								break;
							case 'building':
								$znewbuildingmoldid = $znewmoldid;
								break;
							case 'thing':
								$znewthingmoldid = $znewmoldid;
								break;
						}
						/* get new foreign keys */
						$znewimageid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zwebimage->imageid);
						$znewimagehoverid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zwebimage->imagehoverid);
						$znewimageclickid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zwebimage->imageclickid);
						
						$znewuserid = $wtwhandlers->getUserIDfromPastID($zwebimage->userid);
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zwebimage->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zwebimage->updateuserid);
						
						/* insert new record into webimages table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."webimages 
							   (webimageid,
								pastwebimageid,
								communitymoldid,
								buildingmoldid,
								thingmoldid,
								imageindex,
								imageid,
								imagehoverid,
								imageclickid,
								graphiclevel,
								jsfunction,
								jsparameters,
								userid,
								alttag,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewwebimageid."',
								'".$zwebimage->webimageid."',
								'".$znewcommunitymoldid."',
								'".$znewbuildingmoldid."',
								'".$znewthingmoldid."',
								".$zwebimage->imageindex.",
								'".$znewimageid."',
								'".$znewimagehoverid."',
								'".$znewimageclickid."',
								".$zwebimage->graphiclevel.",
								'".$zwebimage->jsfunction."',
								'".$zwebimage->jsparameters."',
								'".$znewuserid."',
								'".$zwebimage->alttag."',
								'".$zwebimage->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");	
					}			
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadMolds=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadAddFirstBuilding($znewwebid, $zwebtype, $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz, $zusertoken) {
		/* if part of the new install process, add the first building to the first community */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			/* if part of the new install process, add the first building to the first community */
			if ($zwebtype == 'building' && $wtwhandlers->hasValue($zcommunityid)) {
				$znewconnectinggridid = $wtwhandlers->getNewKey('connectinggrids', 'connectinggridid', '');
				$zloadactionzoneid = '';
				if (is_numeric($zbuildingpositionx) == false) {
					$zbuildingpositionx = 0;
				}
				if (is_numeric($zbuildingpositiony) == false) {
					$zbuildingpositiony = 0;
				}
				if (is_numeric($zbuildingpositionz) == false) {
					$zbuildingpositionz = 0;
				}
				if (is_numeric($zbuildingscalingx) == false) {
					$zbuildingscalingx = 1;
				}
				if (is_numeric($zbuildingscalingy) == false) {
					$zbuildingscalingy = 1;
				}
				if (is_numeric($zbuildingscalingz) == false) {
					$zbuildingscalingz = 1;
				}
				if (is_numeric($zbuildingrotationx) == false) {
					$zbuildingrotationx = 0;
				}
				if (is_numeric($zbuildingrotationy) == false) {
					$zbuildingrotationy = 0;
				}
				if (is_numeric($zbuildingrotationz) == false) {
					$zbuildingrotationz = 0;
				}
				
				/* get the extreme loadzone for the new building */
				$zresultsaz = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."actionzones 
					where buildingid='".$znewwebid."'
						and actionzonename='Extreme Load Zone'
						and deleted=0
					limit 1;");
				foreach ($zresultsaz as $zrowaz) {
					$zloadactionzoneid = $zrowaz["actionzoneid"];
				}
				
				/* add connecting grid to place the building into the community during first time installs */
				if ($wtwhandlers->hasValue($zloadactionzoneid)) {
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."connectinggrids 
						   (connectinggridid,
							pastconnectinggridid,
							parentwebid,
							parentwebtype,
							childwebid,
							childwebtype,
							positionx,
							positiony,
							positionz,
							scalingx,
							scalingy,
							scalingz,
							rotationx,
							rotationy,
							rotationz,
							loadactionzoneid,
							altloadactionzoneid,
							unloadactionzoneid,
							attachactionzoneid,
							alttag,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewconnectinggridid."',
							'',
							'".$zcommunityid."',
							'community',
							'".$znewwebid."',
							'building',
							".$zbuildingpositionx.",
							".$zbuildingpositiony.",
							".$zbuildingpositionz.",
							".$zbuildingscalingx.",
							".$zbuildingscalingy.",
							".$zbuildingscalingz.",
							".$zbuildingrotationx.",
							".$zbuildingrotationy.",
							".$zbuildingrotationz.",
							'".$zloadactionzoneid."',
							'',
							'',
							'',
							'',
							now(),
							'".$zuserid."',
							now(),
							'".$zuserid."');");
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadAddFirstBuilding=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadChildConnectingGrids($zrequestchildconnectinggrids, $znewwebid, $zwebtype, $zusertoken, $isprogress) {
		/* process child connecting grids */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array();
		$zresponse[0] = array(
			'childtemplatename' => '',
			'webid' => '',
			'newwebid' => '',
			'webtype' => '',
			'usertoken' => '',
			'parentwebid' => '',
			'parentwebtype' => '',
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (!isset($isprogress)) {
				$isprogress = false;
			}
			/* process child connecting grids */
			if ($zwebtype != 'thing') {
				$zdiffwebid = '';
				$i = 0;
				if (isset($zrequestchildconnectinggrids)) {
					$zrequestchildconnectinggrids = json_decode($zrequestchildconnectinggrids);
				} else {
					$zrequestchildconnectinggrids = array();
				}
				foreach ($zrequestchildconnectinggrids as $zconnectinggrid) {
				
					/* check if the connectinggridid is already in use */
					$znewconnectinggridid = $wtwhandlers->getNewKey('connectinggrids', 'connectinggridid', $zconnectinggrid->connectinggridid);

					if (($zwebtype == 'community' && ($zconnectinggrid->childwebtype == 'building' || $zconnectinggrid->childwebtype == 'thing')) || ($zwebtype == 'building' && $zconnectinggrid->childwebtype == 'thing')) {
						$zfetchweb = false;
						
						/* look out for duplicates, while making sure we get each 3D webs */
						$znewchildwebid = '';
						$znewchildwebtypes = '';
						switch ($zconnectinggrid->childwebtype) {
							case "community":
								$znewchildwebtypes = 'communities';
								break;
							case "building":
								$znewchildwebtypes = 'buildings';
								break;
							case "thing":
								$znewchildwebtypes = 'things';
								break;
						}
						$znewchildwebid = $wtwhandlers->getNewKey($znewchildwebtypes, $zconnectinggrid->childwebtype.'id', $zconnectinggrid->childwebid);
						
						if ($zdiffwebid != $zconnectinggrid->childwebid) {
							$zfetchweb = true;
							$zdiffwebid = $zconnectinggrid->childwebid;
						} else {
							$zresults = $wtwhandlers->query("
								select *  from ".wtw_tableprefix.$znewchildwebtypes." 
								where past".$zconnectinggrid->childwebtype."id='".$zconnectinggrid->childwebid."'
								order by createdate desc
								limit 1;");
							foreach ($zresults as $zrow) {
								$znewchildwebid = $zrow[$zconnectinggrid->childwebtype."id"];
							}
						}
						
						/* get new foreign keys */
						$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->loadactionzoneid);
						$znewaltloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->altloadactionzoneid);
						$znewunloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->unloadactionzoneid);
						$znewattachactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->attachactionzoneid);
						
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->updateuserid);
						
						/* insert new record into connectinggrids table (additional 3D Webs in the current 3D Web) */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."connectinggrids 
							   (connectinggridid,
								pastconnectinggridid,
								parentwebid,
								parentwebtype,
								childwebid,
								childwebtype,
								positionx,
								positiony,
								positionz,
								scalingx,
								scalingy,
								scalingz,
								rotationx,
								rotationy,
								rotationz,
								loadactionzoneid,
								altloadactionzoneid,
								unloadactionzoneid,
								attachactionzoneid,
								alttag,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewconnectinggridid."',
								'".$zconnectinggrid->connectinggridid."',
								'".$znewwebid."',
								'".$zconnectinggrid->parentwebtype."',
								'".$znewchildwebid."',
								'".$zconnectinggrid->childwebtype."',
								".$zconnectinggrid->positionx.",
								".$zconnectinggrid->positiony.",
								".$zconnectinggrid->positionz.",
								".$zconnectinggrid->scalingx.",
								".$zconnectinggrid->scalingy.",
								".$zconnectinggrid->scalingz.",
								".$zconnectinggrid->rotationx.",
								".$zconnectinggrid->rotationy.",
								".$zconnectinggrid->rotationz.",
								'".$znewloadactionzoneid."',
								'".$znewaltloadactionzoneid."',
								'".$znewunloadactionzoneid."',
								'".$znewattachactionzoneid."',
								'".$zconnectinggrid->alttag."',
								'".$zconnectinggrid->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");
						if ($zfetchweb) {
							/* assign newchildwebid, but also need to pass the webid... */
							if ($isprogress) {
								$zresponse[$i] = array(
									'childtemplatename' => base64_encode($zconnectinggrid->childtemplatename),
									'webid' => $zconnectinggrid->childwebid,
									'newwebid' => $znewchildwebid,
									'webtype' => $zconnectinggrid->childwebtype,
									'usertoken' => $zusertoken,
									'parentwebid' => $znewwebid,
									'parentwebtype' => $zconnectinggrid->parentwebtype,
									'serror' => ''
								);
								$i += 1;
							} else {
								$this->downloadWeb($zconnectinggrid->childwebid, $znewchildwebid, $zconnectinggrid->childwebtype, $zusertoken, $znewwebid, $zconnectinggrid->parentwebtype, '', 0, 0, 0, 0);
							}
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadChildConnectingGrids=".$e->getMessage());
			$zresponse[0] = array(
				'childtemplatename' => '',
				'webid' => '',
				'newwebid' => '',
				'webtype' => '',
				'usertoken' => '',
				'parentwebid' => '',
				'parentwebtype' => '',
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadAvatar($zwebid, $znewwebid, $zusertoken) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Avatar to download in the search */
		/* $zwebid is the item selected (3D Avatar) */
		/* $znewwebid is a proposed new value for the web id (optional) */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror'=> '',
			'webid'=> $zwebid,
			'newwebid'=> $znewwebid,
			'webtype'=> 'avatar'
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			/* only add download if the userid exists */
			if ($wtwhandlers->hasValue($zuserid)) {
				$znewwebid = $wtwhandlers->getNewKey('avatars', 'avatarid', $znewwebid);
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zwebid."&webtype=avatar&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				$zrequest = $wtwhandlers->openFilefromURL($zurl);
				if ($wtwhandlers->hasValue($zrequest)) {
					$zrequest = json_decode($zrequest);
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/avatars/'.$znewwebid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/avatars/'.$znewwebid;
				$wtwhandlers->verifyFolderExists($znewfolder);
				
				/* write main avatar record */
				$zobjectfolder = "/content/uploads/avatars/".$znewwebid."/";

				if (isset($zrequest->users)) {
					$this->downloadUsers(json_encode($zrequest->users), $zusertoken);
				}
				if (isset($zrequest)) {
					$this->downloadMainAvatar(json_encode($zrequest), $znewwebid, $zobjectfolder, $zusertoken);
				}
				if (isset($zrequest->files)) {
					$this->downloadAvatarFiles(json_encode($zrequest->files), $zwebid, $zobjectfolder, $zusertoken);
				}
				if ($wtwhandlers->hasValue($zrequest->avatargroup)) {
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
					$this->downloadAvatarGroup($zrequest->avatargroup, $znewcreateuserid, $znewupdateuserid, $zusertoken);
				}
				if (isset($zrequest->avatarparts)) {
					$this->downloadAvatarParts(json_encode($zrequest->avatarparts), $znewwebid, $zusertoken);
				}
				if (isset($zrequest->avataranimationdefs)) {
					$this->downloadAvatarAnimations(json_encode($zrequest->avataranimationdefs), $znewwebid, $zobjectfolder, $zusertoken);
				}
				if (isset($zrequest->contentratings)) {
					$this->downloadContentRatings(json_encode($zrequest->contentratings), $znewwebid, $zusertoken);
				}

				$zresponse = array(
					'serror'=> '',
					'webid'=> $zwebid,
					'newwebid'=> $znewwebid,
					'webtype'=> 'avatar'
				);
			}			
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadAvatar=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'webid'=> $zwebid,
				'newwebid'=> $znewwebid,
				'webtype'=> 'avatar'
			);
		}
		return $zresponse;
	}

	public function downloadAvatarProgress($zwebid, $znewwebid, $zusertoken) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Avatar to download in the search */
		/* $zwebid is the item selected for download (3D Avatar) */
		/* $znewwebid is a proposed new value for the web id (optional) */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror'=> '',
			'webid' => $zwebid,
			'newwebid' => $znewwebid,
			'webtype'=> 'avatar',
			'objectfolder'=> '',
			'avatargroup'=> '',
			'newcreateuserid'=> '',
			'newupdateuserid'=> '',
			'usertoken' => $zusertoken,
			'dataarray' => array(),
			'serror' => ''
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			/* only add download if the userid exists */
			if ($wtwhandlers->hasValue($zuserid)) {
				$znewwebid = $wtwhandlers->getNewKey('avatars', 'avatarid', $znewwebid);
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zwebid."&webtype=avatar&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				$zrequest = $wtwhandlers->openFilefromURL($zurl);
				if ($wtwhandlers->hasValue($zrequest)) {
					$zrequest = json_decode($zrequest);
					$zresponse['dataarray'] = $zrequest;
					if (isset($zrequest->avatargroup)) {
						$zresponse["avatargroup"] = $zrequest->avatargroup;
					}
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/avatars/'.$znewwebid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/avatars/'.$znewwebid;
				$wtwhandlers->verifyFolderExists($znewfolder);
				
				/* write main avatar record */
				$zobjectfolder = "/content/uploads/avatars/".$znewwebid."/";
				$zresponse["objectfolder"] = $zobjectfolder;
				
				if (isset($zrequest->users)) {
					$this->downloadUsers(json_encode($zrequest->users), $zusertoken);
				}
				$zresponse["newcreateuserid"] = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
				$zresponse["newupdateuserid"] = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
			}			
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadAvatarProgress=".$e->getMessage());
			$zresponse = array(
				'serror'=> '',
				'webid' => $zwebid,
				'newwebid' => $znewwebid,
				'webtype'=> 'avatar',
				'objectfolder'=> '',
				'avatargroup'=> '',
				'newcreateuserid'=> '',
				'newupdateuserid'=> '',
				'usertoken' => $zusertoken,
				'dataarray' => array(),
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadMainAvatar($zrequest, $znewwebid, $zobjectfolder, $zusertoken) {
		/* write main web record */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequest)) {
				$zrequest = json_decode($zrequest);
			} else {
				$zrequest = array();
			}
			/* get new foreign keys */
			$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
			$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
			
			$wtwhandlers->query("
				insert into ".wtw_tableprefix."avatars 
				   (avatarid,
					pastavatarid,
					hostuserid,
					versionid,
					version,
					versionorder,
					versiondesc,
					avatargroup,
					displayname,
					avatardescription,
					objectfolder,
					objectfile,
					gender,
					positionx,
					positiony,
					positionz,
					scalingx,
					scalingy,
					scalingz,
					rotationx,
					rotationy,
					rotationz,
					startframe,
					endframe,
					sortorder,
					templatename,
					description,
					tags,
					snapshotid,
					shareuserid,
					sharetemplatedate,
					alttag,
					createdate,
					createuserid,
					updatedate,
					updateuserid)
				values
				   ('".$znewwebid."',
					'".$zrequest->avatarid."',
					'".$zhostuserid."',
					'".$zrequest->versionid."',
					'".$zrequest->version."',
					".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
					'".addslashes($zrequest->versiondesc)."',
					'".addslashes($zrequest->avatargroup)."',
					'".addslashes($zrequest->displayname)."',
					'".addslashes($zrequest->avatardescription)."',
					'".$zobjectfolder."',
					'".$zrequest->objectfile."',
					'".addslashes($zrequest->gender)."',
					".$wtwhandlers->checkNumber($zrequest->positionx,0).",
					".$wtwhandlers->checkNumber($zrequest->positiony,0).",
					".$wtwhandlers->checkNumber($zrequest->positionz,0).",
					".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
					".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
					".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
					".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
					".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
					".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
					".$wtwhandlers->checkNumber($zrequest->startframe,1).",
					".$wtwhandlers->checkNumber($zrequest->endframe,1).",
					25,
					'".addslashes($zrequest->templatename)."',
					'".addslashes($zrequest->description)."',
					'".addslashes($zrequest->tags)."',
					'".$zrequest->snapshotid."',
					'".$zrequest->shareuserid."',
					now(),
					'".addslashes($zrequest->alttag)."',
					'".$zrequest->createdate."',
					'".$znewcreateuserid."',
					'".$zrequest->updatedate."',
					'".$znewupdateuserid."');");			
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadMainAvatar=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function downloadAvatarFiles($zrequestfiles, $zwebid, $zobjectfolder, $zusertoken) {
		/* process all avatar files */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestfiles)) {
				$zrequestfiles = json_decode($zrequestfiles);
			} else {
				$zrequestfiles = array();
			}
			/* process all files */
			foreach ($zrequestfiles as $zfile) {
				if (strpos($zfile->file,'/') !== false) {
					list($zfolder, $zfilename) = explode('/', $zfile->file);
					$wtwhandlers->verifyFolderExists(wtw_rootpath.$zobjectfolder.$zfolder);
					$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zwebid.'/'.$zfolder.'/'.$zfilename, wtw_rootpath.$zobjectfolder.$zfolder.'/', $zfilename);
				} else {
					$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zwebid.'/'.$zfile->file, wtw_rootpath.$zobjectfolder, $zfile->file);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadAvatarFiles=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadAvatarGroup($zavatargroup, $znewcreateuserid, $znewupdateuserid, $zusertoken) {
		/* process avatar group - add if not there already */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			/* check if avatar group exists */
			$zresults = $wtwhandlers->query("
				select *  
				from ".wtw_tableprefix."avatargroups 
				where avatargroup='".$zavatargroup."'
					and (hostuserid='".$zhostuserid."'
						or hostuserid='');");
			if (count($zresults) == 0) {
				$zavatargroupid = $wtwhandlers->getNewKey('avatargroups', 'avatargroupid', $wtwhandlers->getRandomString(16,1));

				$wtwhandlers->query("
					insert into ".wtw_tableprefix."avatargroups
					   (avatargroupid,
						avatargroup,
						hostuserid,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					  values
					   ('".$zavatargroupid."',
						'".addslashes($zavatargroup)."',
						'".$zhostuserid."',
						now(),
						'".$znewcreateuserid."',
						now(),
						'".$znewupdateuserid."');");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadAvatarGroup=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadAvatarParts($zrequestavatarparts, $znewwebid, $zusertoken) {
		/* process all avatar parts */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestavatarparts)) {
				$zrequestavatarparts = json_decode($zrequestavatarparts);
			} else {
				$zrequestavatarparts = array();
			}
			/* process all avatar avatarparts */
			foreach ($zrequestavatarparts as $zpart) {
			
				/* check if the avatarpartid is already in use */
				$zavatarpartid = $wtwhandlers->getNewKey('avatarcolors', 'avatarpartid', $zpart->avatarpartid);

				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zpart->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zpart->updateuserid);

				$zresults = $wtwhandlers->query("
					insert into ".wtw_tableprefix."avatarcolors 
					   (avatarpartid,
						pastavatarpartid,
						avatarid,
						avatarpart,
						diffusecolor,
						specularcolor,
						emissivecolor,
						ambientcolor,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$zavatarpartid."',
						'".$zpart->avatarpartid."',
						'".$znewwebid."',
						'".addslashes($zpart->avatarpart)."',
						'".$zpart->diffusecolor."',
						'".$zpart->specularcolor."',
						'".$zpart->emissivecolor."',
						'".$zpart->ambientcolor."',
						'".$zpart->createdate."',
						'".$znewcreateuserid."',
						'".$zpart->updatedate."',
						'".$znewupdateuserid."');");		
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadAvatarParts=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadAvatarAnimations($zrequestavataranimationdefs, $znewwebid, $zobjectfolder, $zusertoken) {
		/* process all avatar animations */
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror' => ''
		);
		try {
			set_time_limit(0);
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			if (isset($zrequestavataranimationdefs)) {
				$zrequestavataranimationdefs = json_decode($zrequestavataranimationdefs);
			} else {
				$zrequestavataranimationdefs = array();
			}
			/* process all avatar animations */
			foreach ($zrequestavataranimationdefs as $zanimation) {
			
				/* check if the avataranimationid is already in use */
				$zavataranimationid = $wtwhandlers->getNewKey('avataranimations', 'avataranimationid', $zanimation->avataranimationid);
				
				$znewuserid = $wtwhandlers->getUserIDfromPastID($zanimation->userid);
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->updateuserid);

				$zresults = $wtwhandlers->query("
					insert into ".wtw_tableprefix."avataranimations 
					   (avataranimationid,
						pastavataranimationid,
						avatarid,
						userid,
						loadpriority,
						animationevent,
						animationfriendlyname,
						animationicon,
						objectfolder,
						objectfile,
						startframe,
						endframe,
						animationloop,
						speedratio,
						soundid,
						soundmaxdistance,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$zavataranimationid."',
						'".$zanimation->avataranimationid."',
						'".$znewwebid."',
						'".$znewuserid."',
						".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
						'".$zanimation->animationevent."',
						'".addslashes($zanimation->animationfriendlyname)."',
						'".$zanimation->animationicon."',
						'".$zobjectfolder."animations/"."',
						'".$zanimation->objectfile."',
						".$wtwhandlers->checkNumber($zanimation->startframe,1).",
						".$wtwhandlers->checkNumber($zanimation->endframe,1).",
						".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
						".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
						'".$zanimation->soundid."',
						".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
						'".$zanimation->createdate."',
						'".$znewcreateuserid."',
						'".$zanimation->updatedate."',
						'".$znewupdateuserid."');");		
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadAvatarAnimations=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function downloadUpdateAvatar($zwebid, $zupdatewebid, $zwebtype, $zusertoken) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Avatar to download in the search */
		/* $zwebid is the item selected (3D Avatar) */
		/* $zupdatewebid is the downloaded web id (new version) */
		/* $zwebtype is 'avatar' */ 
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror'=> '',
			'webid'=> $zwebid,
			'webtype'=> $zwebtype
		);
		try {

			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			/* only add download if the userid exists */
			if ($wtwhandlers->hasValue($zuserid)) {
				//$zupdatewebid = $wtwhandlers->getNewKey('avatars', $zwebtype.'id', $zupdatewebid);
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zupdatewebid."&webtype=".$zwebtype."&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				$zrequest = $wtwhandlers->openFilefromURL($zurl);
				if ($wtwhandlers->hasValue($zrequest)) {
					$zrequest = json_decode($zrequest);
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/avatars/'.$zwebid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/avatars/'.$zwebid;
				$wtwhandlers->verifyFolderExists($znewfolder);
				
				/* process all users associated to this download (for your reference) */
				foreach ($zrequest->users as $zuser) {
					/* check if the userid is already in use */
					$znewuserid = $wtwhandlers->getNewKey('users', 'userid', $zuser->userid);
					$znewuploadpathid = $wtwhandlers->getNewKey('users', "uploadpathid", $zuser->uploadpathid);
					$zuserpassword = $wtwhandlers->getRandomString(16,1);
					$zresults = $wtwhandlers->query("
						select userid
						from ".wtw_tableprefix."users 
						where userid='".$znewuserid."'
						limit 1;
						");
					if (count($zresults) == 0) {
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."users 
							   (userid,
								pastuserid,
								displayname,
								email,
								uploadpathid,
								userpassword,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewuserid."',
								'".$zuser->userid."',
								'".addslashes($zuser->displayname)."',
								'".$zuser->email."',
								'".$znewuploadpathid."',
								'".$zuserpassword."',
								now(),
								'".$znewuserid."',
								now(),
								'".$znewuserid."');");
					}
				}
				
				/* write main avatar record */
				$zobjectfolder = "/content/uploads/avatars/".$zwebid."/";

				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
				
				$zfoundavatarid = '';
				$zresults = $wtwhandlers->query("
					select avatarid, hostuserid
					from ".wtw_tableprefix."avatars 
					where avatarid='".$zwebid."'
					limit 1;
					");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				
				if ($wtwhandlers->hasValue($zfoundavatarid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatars 
						set version='".$zrequest->version."',
							versionorder=".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
							versiondesc='".addslashes($zrequest->versiondesc)."',
							avatargroup='".addslashes($zrequest->avatargroup)."',
							displayname='".addslashes($zrequest->displayname)."',
							avatardescription='".addslashes($zrequest->avatardescription)."',
							objectfolder='".$zobjectfolder."',
							objectfile='".$zrequest->objectfile."',
							gender='".addslashes($zrequest->gender)."',
							positionx=".$wtwhandlers->checkNumber($zrequest->positionx,0).",
							positiony=".$wtwhandlers->checkNumber($zrequest->positiony,0).",
							positionz=".$wtwhandlers->checkNumber($zrequest->positionz,0).",
							scalingx=".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
							scalingy=".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
							scalingz=".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
							rotationx=".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
							rotationy=".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
							rotationz=".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
							startframe=".$wtwhandlers->checkNumber($zrequest->startframe,1).",
							endframe=".$wtwhandlers->checkNumber($zrequest->endframe,1).",
							sortorder=25,
							templatename='".addslashes($zrequest->templatename)."',
							description='".addslashes($zrequest->description)."',
							tags='".addslashes($zrequest->tags)."',
							snapshotid='".$zrequest->snapshotid."',
							alttag='".addslashes($zrequest->alttag)."',
							updatedate='".$zrequest->updatedate."',
							updateuserid='".$znewupdateuserid."'
						where avatarid='".$zwebid."' 
						limit 1;");
				} else {
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatars 
						   (avatarid,
							pastavatarid,
							hostuserid,
							versionid,
							version,
							versionorder,
							versiondesc,
							avatargroup,
							displayname,
							avatardescription,
							objectfolder,
							objectfile,
							gender,
							positionx,
							positiony,
							positionz,
							scalingx,
							scalingy,
							scalingz,
							rotationx,
							rotationy,
							rotationz,
							startframe,
							endframe,
							sortorder,
							templatename,
							description,
							tags,
							snapshotid,
							shareuserid,
							sharetemplatedate,
							alttag,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zwebid."',
							'".$zrequest->avatarid."',
							'".$zhostuserid."',
							'".$zrequest->versionid."',
							'".$zrequest->version."',
							".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
							'".addslashes($zrequest->versiondesc)."',
							'".addslashes($zrequest->avatargroup)."',
							'".addslashes($zrequest->displayname)."',
							'".addslashes($zrequest->avatardescription)."',
							'".$zobjectfolder."',
							'".$zrequest->objectfile."',
							'".addslashes($zrequest->gender)."',
							".$wtwhandlers->checkNumber($zrequest->positionx,0).",
							".$wtwhandlers->checkNumber($zrequest->positiony,0).",
							".$wtwhandlers->checkNumber($zrequest->positionz,0).",
							".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
							".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
							".$wtwhandlers->checkNumber($zrequest->startframe,1).",
							".$wtwhandlers->checkNumber($zrequest->endframe,1).",
							25,
							'".addslashes($zrequest->templatename)."',
							'".addslashes($zrequest->description)."',
							'".addslashes($zrequest->tags)."',
							'".$zrequest->snapshotid."',
							'".$zrequest->shareuserid."',
							now(),
							'".addslashes($zrequest->alttag)."',
							'".$zrequest->createdate."',
							'".$znewcreateuserid."',
							'".$zrequest->updatedate."',
							'".$znewupdateuserid."');");
				}

				
				/* process all files */
				foreach ($zrequest->files as $zfile) {
					if (strpos($zfile->file,'/') !== false) {
						list($zfolder, $zfilename) = explode('/', $zfile->file);
						$wtwhandlers->verifyFolderExists(wtw_rootpath.$zobjectfolder.$zfolder);
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zupdatewebid.'/'.$zfolder.'/'.$zfilename, wtw_rootpath.$zobjectfolder.$zfolder.'/', $zfilename);
					} else {
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zupdatewebid.'/'.$zfile->file, wtw_rootpath.$zobjectfolder, $zfile->file);
					}
				}
				
				/* check if avatar group exists */
				$zresults = $wtwhandlers->query("
					select *  
					from ".wtw_tableprefix."avatargroups 
					where avatargroup='".$zrequest->avatargroup."'
						and (hostuserid='".$zhostuserid."'
							or hostuserid='');");
				if (count($zresults) == 0) {
					$zavatargroupid = $wtwhandlers->getNewKey('avatargroups', 'avatargroupid', $wtwhandlers->getRandomString(16,1));

					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatargroups
						   (avatargroupid,
							avatargroup,
							hostuserid,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatargroupid."',
							'".addslashes($zrequest->avatargroup)."',
							'".$zhostuserid."',
							now(),
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
				}


				/* process all avatar avatarparts */
				foreach ($zrequest->avatarparts as $zpart) {
				
					/* check if the avatarpartid is already in use */
					$zavatarpartid = $zpart->avatarpartid;
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zpart->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zpart->updateuserid);
					
					$zfoundavatarpartid = '';
					$zresults = $wtwhandlers->query("
						select avatarpartid
						from ".wtw_tableprefix."avatarcolors 
						where avatarid='".$zwebid."'
							and avatarpart='".addslashes($zpart->avatarpart)."'
						limit 1;
						");
					foreach ($zresults as $zrow) {
						$zfoundavatarpartid = $zrow["avatarpartid"];
					}

					if ($wtwhandlers->hasValue($zfoundavatarpartid)) {
						/* update the colors if found */
						$wtwhandlers->query("
							update ".wtw_tableprefix."avatarcolors 
							set diffusecolor='".$zpart->diffusecolor."',
								specularcolor='".$zpart->specularcolor."',
								emissivecolor='".$zpart->emissivecolor."',
								ambientcolor='".$zpart->ambientcolor."',
								updatedate='".$zpart->updatedate."',
								updateuserid='".$znewupdateuserid."'
							where avatarpartid='".$zfoundavatarpartid."'
							limit 1;");
					} else {
						/* add any missing parts and set default color */
						$zavatarpartid = $wtwhandlers->getNewKey('avatarcolors', 'avatarpartid', $zpart->avatarpartid);
						$zresults = $wtwhandlers->query("
							insert into ".wtw_tableprefix."avatarcolors 
							   (avatarpartid,
								pastavatarpartid,
								avatarid,
								avatarpart,
								diffusecolor,
								specularcolor,
								emissivecolor,
								ambientcolor,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zavatarpartid."',
								'".$zpart->avatarpartid."',
								'".$zwebid."',
								'".addslashes($zpart->avatarpart)."',
								'".$zpart->diffusecolor."',
								'".$zpart->specularcolor."',
								'".$zpart->emissivecolor."',
								'".$zpart->ambientcolor."',
								'".$zpart->createdate."',
								'".$znewcreateuserid."',
								'".$zpart->updatedate."',
								'".$znewupdateuserid."');");		
					}
				}

				/* process all avatar animations */
				foreach ($zrequest->avataranimationdefs as $zanimation) {
				
					/* check if the avataranimationid is already in use */
					$zavataranimationid = $wtwhandlers->getNewKey('avataranimations', 'avataranimationid', $zanimation->avataranimationid);
					
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zanimation->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->updateuserid);

					$zfoundavataranimationid = '';
					if ($zanimation->animationevent != 'onoption') {
						$zresults = $wtwhandlers->query("
							select avataranimationid
							from ".wtw_tableprefix."avataranimations 
							where avatarid='".$zwebid."'
								and animationevent='".$zanimation->animationevent."'
							limit 1;
							");
						foreach ($zresults as $zrow) {
							$zfoundavataranimationid = $zrow["avataranimationid"];
						}
					} else {
						$zresults = $wtwhandlers->query("
							select avataranimationid
							from ".wtw_tableprefix."avataranimations 
							where avatarid='".$zwebid."'
								and animationevent='".$zanimation->animationevent."'
								and objectfile='".$zanimation->objectfile."'
							limit 1;
							");
						foreach ($zresults as $zrow) {
							$zfoundavataranimationid = $zrow["avataranimationid"];
						}
					}

					if ($wtwhandlers->hasValue($zfoundavataranimationid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."avataranimations 
							set userid='".$znewuserid."',
								loadpriority=".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
								animationicon='".$zanimation->animationicon."',
								objectfolder='".$zobjectfolder."animations/"."',
								objectfile='".$zanimation->objectfile."',
								startframe=".$wtwhandlers->checkNumber($zanimation->startframe,1).",
								endframe=".$wtwhandlers->checkNumber($zanimation->endframe,1).",
								animationloop=".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
								speedratio=".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
								soundid='".$zanimation->soundid."',
								soundmaxdistance=".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
								updatedate='".$zanimation->updatedate."',
								updateuserid='".$znewupdateuserid."'
							where avataranimationid='".$zfoundavataranimationid."'
							limit 1;");
					} else {
						$zresults = $wtwhandlers->query("
							insert into ".wtw_tableprefix."avataranimations 
							   (avataranimationid,
								pastavataranimationid,
								avatarid,
								userid,
								loadpriority,
								animationevent,
								animationfriendlyname,
								animationicon,
								objectfolder,
								objectfile,
								startframe,
								endframe,
								animationloop,
								speedratio,
								soundid,
								soundmaxdistance,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zavataranimationid."',
								'".$zanimation->avataranimationid."',
								'".$zwebid."',
								'".$znewuserid."',
								".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
								'".$zanimation->animationevent."',
								'".addslashes($zanimation->animationfriendlyname)."',
								'".$zanimation->animationicon."',
								'".$zobjectfolder."animations/"."',
								'".$zanimation->objectfile."',
								".$wtwhandlers->checkNumber($zanimation->startframe,1).",
								".$wtwhandlers->checkNumber($zanimation->endframe,1).",
								".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
								".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
								'".$zanimation->soundid."',
								".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
								'".$zanimation->createdate."',
								'".$znewcreateuserid."',
								'".$zanimation->updatedate."',
								'".$znewupdateuserid."');");		
					}
				}


				/* process all content ratings */
				if (isset($zrequest->contentratings)) {
					foreach ($zrequest->contentratings as $zcontentrating) {
					
						/* check if the contentratingid is already in use */
						
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->updateuserid);

						$zfoundcontentratingid = '';
						$zresults = $wtwhandlers->query("
							select contentratingid
							from ".wtw_tableprefix."contentratings 
							where webid='".$zwebid."'
								and webtype='".$zcontentrating->webtype."'
							limit 1;
							");
						foreach ($zresults as $zrow) {
							$zfoundcontentratingid = $zrow["contentratingid"];
						}
						
						if ($wtwhandlers->hasValue($zfoundcontentratingid)) {
							$wtwhandlers->query("
								update ".wtw_tableprefix."contentratings 
								set rating='".$zcontentrating->rating."',
									ratingvalue=".$wtwhandlers->checkNumber($zcontentrating->ratingvalue,0).",
									contentwarning='".addslashes($zcontentrating->contentwarning)."',
									updatedate='".$zcontentrating->updatedate."',
									updateuserid='".$znewupdateuserid."'
								where contentratingid='".$zfoundcontentratingid."'
								limit 1;");		
						} else {
							$zcontentratingid = $wtwhandlers->getNewKey('contentratings', 'contentratingid', $zcontentrating->contentratingid);
							$zresults = $wtwhandlers->query("
								insert into ".wtw_tableprefix."contentratings 
								   (contentratingid,
									pastcontentratingid,
									webid,
									webtype,
									rating,
									ratingvalue,
									contentwarning,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								values
								   ('".$zcontentratingid."',
									'".$zcontentrating->contentratingid."',
									'".$zwebid."',
									'".$zcontentrating->webtype."',
									'".$zcontentrating->rating."',
									".$wtwhandlers->checkNumber($zcontentrating->ratingvalue,0).",
									'".addslashes($zcontentrating->contentwarning)."',
									'".$zcontentrating->createdate."',
									'".$znewcreateuserid."',
									'".$zcontentrating->updatedate."',
									'".$znewupdateuserid."');");		
						}
					}
				}

				$zresponse = array(
					'serror'=> '',
					'webid'=> $zwebid,
					'webtype'=> $zwebtype
				);
			}			
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUpdateAvatar=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'webid'=> $zwebid,
				'webtype'=> $zwebtype
			);
		}
		return $zresponse;
	}

	public function downloadUpdateUserAvatar($zuseravatarid, $zinstanceid, $zwebid, $zupdatewebid, $zwebtype, $zusertoken) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Avatar to download in the search */
		/* $zwebid is the item selected (3D Avatar) */
		/* $zupdatewebid is the downloaded web id (new version) */
		/* $zwebtype is 'avatar' */ 
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror'=> '',
			'useravatarid'=> $zuseravatarid,
			'webid'=> $zwebid,
			'webtype'=> $zwebtype
		);
		try {

			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			$zuserid = $wtwhandlers->userid;
			$zhostuserid = '';
			/* allow usertoken authentication */
			if ((!isset($zuserid) || empty($zuserid)) && $wtwhandlers->hasValue($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
						or CONVERT(from_base64(wordpresstoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $zuserid;
			}

			/* only add download if the userid exists */
			if ($wtwhandlers->hasValue($zuserid)) {
				//$zupdatewebid = $wtwhandlers->getNewKey('avatars', $zwebtype.'id', $zupdatewebid);
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zupdatewebid."&webtype=".$zwebtype."&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				$zrequest = $wtwhandlers->openFilefromURL($zurl);
				if ($wtwhandlers->hasValue($zrequest)) {
					$zrequest = json_decode($zrequest);
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/useravatars/'.$zuseravatarid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/useravatars/'.$zuseravatarid;
				$wtwhandlers->verifyFolderExists($znewfolder);
				
				/* process all users associated to this download (for your reference) */
				foreach ($zrequest->users as $zuser) {
					/* check if the userid is already in use */
					$znewuserid = $wtwhandlers->getNewKey('users', 'userid', $zuser->userid);
					$znewuploadpathid = $wtwhandlers->getNewKey('users', "uploadpathid", $zuser->uploadpathid);
					$zuserpassword = $wtwhandlers->getRandomString(16,1);
					$zresults = $wtwhandlers->query("
						select userid
						from ".wtw_tableprefix."users 
						where userid='".$znewuserid."'
						limit 1;
						");
					if (count($zresults) == 0) {
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."users 
							   (userid,
								pastuserid,
								displayname,
								email,
								uploadpathid,
								userpassword,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewuserid."',
								'".$zuser->userid."',
								'".addslashes($zuser->displayname)."',
								'".$zuser->email."',
								'".$znewuploadpathid."',
								'".$zuserpassword."',
								now(),
								'".$znewuserid."',
								now(),
								'".$znewuserid."');");
					}
				}
				
				/* write main avatar record */
				$zobjectfolder = "/content/uploads/useravatars/".$zuseravatarid."/";

				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
				
				$zfounduseravatarid = '';
				$zresults = $wtwhandlers->query("
					select useravatarid
					from ".wtw_tableprefix."useravatars 
					where useravatarid='".$zuseravatarid."'
					limit 1;
					");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
				
				if ($wtwhandlers->hasValue($zfounduseravatarid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."useravatars 
						set version='".$zrequest->version."',
							versionorder=".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
							versiondesc='".addslashes($zrequest->versiondesc)."',
							avatargroup='".addslashes($zrequest->avatargroup)."',
							avatardescription='".addslashes($zrequest->avatardescription)."',
							objectfolder='".$zobjectfolder."',
							objectfile='".$zrequest->objectfile."',
							gender='".addslashes($zrequest->gender)."',
							positionx=".$wtwhandlers->checkNumber($zrequest->positionx,0).",
							positiony=".$wtwhandlers->checkNumber($zrequest->positiony,0).",
							positionz=".$wtwhandlers->checkNumber($zrequest->positionz,0).",
							scalingx=".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
							scalingy=".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
							scalingz=".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
							rotationx=".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
							rotationy=".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
							rotationz=".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
							startframe=".$wtwhandlers->checkNumber($zrequest->startframe,1).",
							endframe=".$wtwhandlers->checkNumber($zrequest->endframe,1).",
							updatedate='".$zrequest->updatedate."',
							updateuserid='".$znewupdateuserid."'
						where useravatarid='".$zuseravatarid."'
						limit 1;");
				}
				
				/* process all files */
				foreach ($zrequest->files as $zfile) {
					if (strpos($zfile->file,'/') !== false) {
						list($zfolder, $zfilename) = explode('/', $zfile->file);
						$wtwhandlers->verifyFolderExists(wtw_rootpath.$zobjectfolder.$zfolder);
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zupdatewebid.'/'.$zfolder.'/'.$zfilename, wtw_rootpath.$zobjectfolder.$zfolder.'/', $zfilename);
					} else {
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zupdatewebid.'/'.$zfile->file, wtw_rootpath.$zobjectfolder, $zfile->file);
					}
				}
				
				/* check if avatar group exists */
				$zresults = $wtwhandlers->query("
					select *  
					from ".wtw_tableprefix."avatargroups 
					where avatargroup='".$zrequest->avatargroup."'
						and (hostuserid='".$zhostuserid."'
							or hostuserid='');");
				if (count($zresults) == 0) {
					$zavatargroupid = $wtwhandlers->getNewKey('avatargroups', 'avatargroupid', $wtwhandlers->getRandomString(16,1));

					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatargroups
						   (avatargroupid,
							avatargroup,
							hostuserid,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatargroupid."',
							'".addslashes($zrequest->avatargroup)."',
							'".$zhostuserid."',
							now(),
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
				}


				/* process all avatar avatarparts */
				foreach ($zrequest->avatarparts as $zpart) {
				
					/* check if the avatarpartid is already in use */
					$zavatarpartid = $zpart->avatarpartid;
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zpart->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zpart->updateuserid);
					
					$zfoundavatarpartid = '';
					$zresults = $wtwhandlers->query("
						select avatarpartid
						from ".wtw_tableprefix."useravatarcolors 
						where useravatarid='".$zuseravatarid."'
							and avatarpart='".addslashes($zpart->avatarpart)."'
						limit 1;
						");
					foreach ($zresults as $zrow) {
						$zfoundavatarpartid = $zrow["avatarpartid"];
					}

					if ($wtwhandlers->hasValue($zfoundavatarpartid)) {
						/* update the colors if found */
						$wtwhandlers->query("
							update ".wtw_tableprefix."useravatarcolors 
							set diffusecolor='".$zpart->diffusecolor."',
								specularcolor='".$zpart->specularcolor."',
								emissivecolor='".$zpart->emissivecolor."',
								ambientcolor='".$zpart->ambientcolor."',
								updatedate='".$zpart->updatedate."',
								updateuserid='".$znewupdateuserid."'
							where avatarpartid='".$zfoundavatarpartid."'
							limit 1;");
					} else {
						/* add any missing parts and set default color */
						$zavatarpartid = $wtwhandlers->getNewKey('useravatarcolors', 'avatarpartid', $zpart->avatarpartid);
						$zresults = $wtwhandlers->query("
							insert into ".wtw_tableprefix."useravatarcolors 
							   (avatarpartid,
								pastavatarpartid,
								userid,
								useravatarid,
								instanceid,
								avatarpart,
								diffusecolor,
								specularcolor,
								emissivecolor,
								ambientcolor,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zavatarpartid."',
								'".$zpart->avatarpartid."',
								'".$zuserid."',
								'".$zuseravatarid."',
								'".$zinstanceid."',
								'".addslashes($zpart->avatarpart)."',
								'".$zpart->diffusecolor."',
								'".$zpart->specularcolor."',
								'".$zpart->emissivecolor."',
								'".$zpart->ambientcolor."',
								'".$zpart->createdate."',
								'".$znewcreateuserid."',
								'".$zpart->updatedate."',
								'".$znewupdateuserid."');");		
					}
				}

				/* process all avatar animations */
				foreach ($zrequest->avataranimationdefs as $zanimation) {
				
					/* check if the useravataranimationid is already in use */
					$zuseravataranimationid = $wtwhandlers->getNewKey('useravataranimations', 'useravataranimationid', $zanimation->avataranimationid);
					
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zanimation->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->updateuserid);

					$zfounduseravataranimationid = '';
					$zresults = $wtwhandlers->query("
						select useravataranimationid
						from ".wtw_tableprefix."useravataranimations 
						where useravatarid='".$zuseravatarid."'
							and animationevent='".$zanimation->animationevent."'
							and animationfriendlyname='".addslashes($zanimation->animationfriendlyname)."'
							and objectfile='".$zanimation->objectfile."'
						limit 1;
						");
					foreach ($zresults as $zrow) {
						$zfounduseravataranimationid = $zrow["useravataranimationid"];
					}

					if ($wtwhandlers->hasValue($zfounduseravataranimationid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."useravataranimations 
							set avataranimationid='".$zanimation->avataranimationid."',
								loadpriority=".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
								animationicon='".$zanimation->animationicon."',
								objectfolder='".$zobjectfolder."animations/"."',
								objectfile='".$zanimation->objectfile."',
								startframe=".$wtwhandlers->checkNumber($zanimation->startframe,1).",
								endframe=".$wtwhandlers->checkNumber($zanimation->endframe,1).",
								animationloop=".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
								speedratio=".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
								soundid='".$zanimation->soundid."',
								soundmaxdistance=".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
								updatedate='".$zanimation->updatedate."',
								updateuserid='".$znewupdateuserid."'
							where useravataranimationid='".$zfounduseravataranimationid."'
							limit 1;");
					} else {
						$zresults = $wtwhandlers->query("
							insert into ".wtw_tableprefix."useravataranimations 
							   (useravataranimationid,
								avataranimationid,
								useravatarid,
								loadpriority,
								animationevent,
								animationfriendlyname,
								animationicon,
								objectfolder,
								objectfile,
								startframe,
								endframe,
								animationloop,
								speedratio,
								soundid,
								soundmaxdistance,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zuseravataranimationid."',
								'".$zanimation->avataranimationid."',
								'".$zuseravatarid."',
								".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
								'".$zanimation->animationevent."',
								'".addslashes($zanimation->animationfriendlyname)."',
								'".$zanimation->animationicon."',
								'".$zobjectfolder."animations/"."',
								'".$zanimation->objectfile."',
								".$wtwhandlers->checkNumber($zanimation->startframe,1).",
								".$wtwhandlers->checkNumber($zanimation->endframe,1).",
								".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
								".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
								'".$zanimation->soundid."',
								".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
								'".$zanimation->createdate."',
								'".$znewcreateuserid."',
								'".$zanimation->updatedate."',
								'".$znewupdateuserid."');");		
					}
				}

				$zresponse = array(
					'serror'=> '',
					'useravatarid'=> $zuseravatarid,
					'webid'=> $zwebid,
					'webtype'=> $zwebtype
				);
			}			
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_downloads.php-downloadUpdateUserAvatar=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'useravatarid'=> $zuseravatarid,
				'webid'=> $zwebid,
				'webtype'=> $zwebtype
			);
		}
		return $zresponse;
	}

	public function addDownloadQueue($zwebid, $zwebtype) {
		/* Add Web to download queue */
		global $wtwconnect;
		$zresponse = array(
			'success'=>'0',
			'serror'=>''
		);
		try {
			$zfound = false;
			$zdownloadid = $wtwconnect->getRandomString(16,1);
			$zuserip = $wtwconnect->getClientIP();
			$zfromurl = $_SERVER['HTTP_REFERER'];
			/* check to see if it is already there */
			$zresults = $wtwconnect->query("
				select * 
				from ".wtw_tableprefix."downloads
				where webid='".$zwebid."'
					and webtype='".$zwebtype."'
					and deleted=0
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfound = true;
			}
			if ($zfound == false) {
				$wtwconnect->query("
					insert into ".wtw_tableprefix."downloads
					   (downloadid,
					    webid,
						webtype,
						userip,
						fromurl,
						createdate,
						updatedate)
					 values
					   ('".$zdownloadid."',
					    '".$zwebid."',
						'".$zwebtype."',
						'".$zuserip."',
						'".$zfromurl."',
						now(),
						now());
				");
				$zresponse = array(
					'success'=>'1',
					'serror'=>''
				);
			} else {
				$zresponse = array(
					'success'=>'0',
					'serror'=>'Download already found in Queue'
				);
			}
		} catch (Exception $e) {
			$wtwconnect->serror("plugins:wtw-3dinternet:functions-class_downloads.php-addDownloadQueue=".$e->getMessage());
			$zresponse = array(
				'success'=>'0',
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}

}

	function wtw_3dinternet_downloads() {
		return wtw_3dinternet_downloads::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtw_3dinternet_downloads'] = wtw_3dinternet_downloads();

?>
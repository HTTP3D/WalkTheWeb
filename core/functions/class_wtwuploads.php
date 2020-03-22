<?php
class wtwuploads {
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
	
	public function checkContentFolders($zcommunityid, $zbuildingid, $zthingid) {
		global $wtwhandlers;
		try {
			if (!file_exists($wtwhandlers->contentpath."/uploads")) {
				mkdir($wtwhandlers->contentpath."/uploads", 0777);
			}
			if (!file_exists($wtwhandlers->contentpath."/uploads/users")) {
				mkdir($wtwhandlers->contentpath."/uploads/users", 0777);
			}
			if (!file_exists($wtwhandlers->contentpath."/uploads/communities")) {
				mkdir($wtwhandlers->contentpath."/uploads/communities", 0777);
			}
			if (!file_exists($wtwhandlers->contentpath."/uploads/buildings")) {
				mkdir($wtwhandlers->contentpath."/uploads/buildings", 0777);
			}
			if (!file_exists($wtwhandlers->contentpath."/uploads/things")) {
				mkdir($wtwhandlers->contentpath."/uploads/things", 0777);
			}
			if (!empty($zcommunityid) && isset($zcommunityid)) {
				if (!file_exists($wtwhandlers->contentpath."/uploads/communities/".$zcommunityid)) {
					mkdir($wtwhandlers->contentpath."/uploads/communities/".$zcommunityid, 0777);
				}
				if (!file_exists($wtwhandlers->contentpath."/uploads/communities/".$zcommunityid."/media")) {
					mkdir($wtwhandlers->contentpath."/uploads/communities/".$zcommunityid."/media", 0777);
				}
				if (!file_exists($wtwhandlers->contentpath."/uploads/communities/".$zcommunityid."/snapshots")) {
					mkdir($wtwhandlers->contentpath."/uploads/communities/".$zcommunityid."/snapshots", 0777);
				}
			}
			if (!empty($zbuildingid) && isset($zbuildingid)) {
				if (!file_exists($wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid)) {
					mkdir($wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid, 0777);
				}
				if (!file_exists($wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid."/media")) {
					mkdir($wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid."/media", 0777);
				}
				if (!file_exists($wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid."/snapshots")) {
					mkdir($wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid."/snapshots", 0777);
				}
			}
			if (!empty($zthingid) && isset($zthingid)) {
				if (!file_exists($wtwhandlers->contentpath."/uploads/things/".$zthingid)) {
					mkdir($wtwhandlers->contentpath."/uploads/things/".$zthingid, 0777);
				}
				if (!file_exists($wtwhandlers->contentpath."/uploads/things/".$zthingid."/media")) {
					mkdir($wtwhandlers->contentpath."/uploads/things/".$zthingid."/media", 0777);
				}
				if (!file_exists($wtwhandlers->contentpath."/uploads/things/".$zthingid."/snapshots")) {
					mkdir($wtwhandlers->contentpath."/uploads/things/".$zthingid."/snapshots", 0777);
				}
			}
			if(isset($_SESSION['wtw_uploadpathid']) && !empty($_SESSION['wtw_uploadpathid'])) {
				$syear = date('Y');
				$smonth = date('m');
				if (!file_exists($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid'])) {
					mkdir($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid'], 0777);
				}
				if (!file_exists($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$syear)) {
					mkdir($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$syear, 0777);
				}
				if (!file_exists($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$syear."/".$smonth)) {
					mkdir($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$syear."/".$smonth, 0777);
				}
				if (!file_exists($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects")) {
					mkdir($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects", 0777);
				}
			}

			
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-checkContentFolders=".$e->getMessage());
		}
	}
	
	public function copyFile($zfile1, $zfilepath1, $zfile2, $zfilepath2, $zcommunityid, $zbuildingid, $zthingid) {
		global $wtwhandlers;
		$serror = "";
		try {
			$this->checkContentFolders($zcommunityid, $zbuildingid, $zthingid);
			if (!file_exists($zfilepath1.$zfile1)) {
				$serror = "Source File not Found. ".$zfilepath1.$zfile1;
			}
			if (!file_exists($zfilepath2)) {
				mkdir($zfilepath2, 0777);
			}
			if (file_exists($zfilepath2.$zfile2)) {
				$serror = "Destination File Already Exists. ".$zfilepath2.$zfile2;
			}
			if ($serror == "") {
				copy($zfilepath1.$zfile1, $zfilepath2.$zfile2);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-copyFile=".$e->getMessage());
		}	
		return $serror;
	}

	public function deleteFile($zfile1, $zfilepath1, $zcommunityid, $zbuildingid) {
		global $wtwhandlers;
		/* purposly not added yet */
	}
	
	public function getSetting($zsettingname) {
		global $wtwhandlers;
		return $wtwhandlers->getSetting($zsettingname);
	}

	public function getSettings($zsettingnames) {
		global $wtwhandlers;
		return $wtwhandlers->getSettings($zsettingnames);
	}

	public function saveSetting($zsettingname, $zsettingvalue) {
		global $wtwhandlers;
		return $wtwhandlers->saveSetting($zsettingname, $zsettingvalue);
	}
	
	public function saveSettings($zsettings) {
		global $wtwhandlers;
		return $wtwhandlers->saveSettings($zsettings);
	}

	public function updateFileInDb($zuploadid, $imageset, $originalid, $websizeid, $thumbnailid, $zfiletitle, $zfilename, $zfileextension, $zfilesize, $zfiletype, $zfiledata, $imagewidth, $imageheight, $zfilepath) {
		global $wtwhandlers;
		$zresults = array();
		try {
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				if (empty($zuploadid) || !isset($zuploadid)) {
					$zuploadid = $wtwhandlers->getRandomString(16,1);
				}
				if (empty($originalid) || !isset($originalid)) {
					$originalid = $zuploadid;
				}
				if ($imageset == 'websize' && (empty($websizeid) || !isset($websizeid))) {
					$websizeid = $zuploadid;
				} else if ($imageset == 'thumbnail' && (empty($thumbnailid) || !isset($thumbnailid))) {
					$thumbnailid = $zuploadid;
				}
				if ((!empty($zfilepath) && isset($zfilepath)) || empty($zfiledata) || !isset($zfiledata)) {
					$zfiledata = "null";
				} else {
					$zfiledata = "'".$zfiledata."'";
				}
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."uploads
						(uploadid,
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
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
					values
						('".$zuploadid."',
						 '".$originalid."',
						 '".$websizeid."',
						 '".$thumbnailid."',
						 '".$wtwhandlers->userid."',
						 '".$zfiletitle."',
						 '".$zfilename."',
						 '".$zfileextension."',
						 ".$wtwhandlers->checkNumber($zfilesize,1024).",
						 '".$zfiletype."',
						 '".$zfilepath."',
						 ".$zfiledata.",
						 ".$wtwhandlers->checkNumber($imagewidth,512).",
						 ".$wtwhandlers->checkNumber($imageheight,512).",
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
				if (!empty($websizeid) && isset($websizeid) && !empty($originalid) && isset($originalid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploads
						set websizeid = '".$websizeid."'
						where originalid='".$originalid."'
							and websizeid = ''
							and not originalid = '';");
				}
				if (!empty($thumbnailid) && isset($thumbnailid) && !empty($originalid) && isset($originalid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploads
						set thumbnailid = '".$thumbnailid."'
						where originalid='".$originalid."'
							and thumbnailid = ''
							and not originalid = '';");
				}
				$zresults = $wtwhandlers->query("
					select *
					from ".wtw_tableprefix."uploads
					where uploadid='".$zuploadid."';");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-updateFileInDb=".$e->getMessage());
		}	
		return $zresults;
	}
	
	public function saveImageFilePng($zfilepath1, $zfilename1, $zfiledata, $zcommunityid, $zbuildingid, $zthingid) {
		global $wtwhandlers;
		$zsnapshotid = "";
		$zsnapshotpath = "";
		$zsnapshotdata = null;
		try {
			$browsepath = "";
			$previewpath = "";
			$previewfilename = "";
			$previewbrowsepath = "";
			$zuserid = "";
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
			}
			$this->checkContentFolders($zcommunityid, $zbuildingid, $zthingid);
			
			if (!empty($zbuildingid)) {
				$zfilepath1 = $wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid."/snapshots/";
				$browsepath = $wtwhandlers->contenturl."/uploads/buildings/".$zbuildingid."/snapshots/".$zfilename1;
				$previewpath = $wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid."-snapshot.png";
				$previewbrowsepath = $wtwhandlers->contenturl."/uploads/buildings/".$zbuildingid."-snapshot.png";
				$previewfilename = $zbuildingid."-snapshot.png";
			} else if (!empty($zcommunityid)) {
				$zfilepath1 = $wtwhandlers->contentpath."/uploads/communities/".$zcommunityid."/snapshots/";
				$browsepath = $wtwhandlers->contenturl."/uploads/communities/".$zcommunityid."/snapshots/".$zfilename1;
				$previewpath = $wtwhandlers->contentpath."/uploads/communities/".$zcommunityid."-snapshot.png";
				$previewbrowsepath = $wtwhandlers->contenturl."/uploads/communities/".$zcommunityid."-snapshot.png";
				$previewfilename = $zcommunityid."-snapshot.png";
			} else if (!empty($zthingid)) {
				$zfilepath1 = $wtwhandlers->contentpath."/uploads/things/".$zthingid."/snapshots/";
				$browsepath = $wtwhandlers->contenturl."/uploads/things/".$zthingid."/snapshots/".$zfilename1;
				$previewpath = $wtwhandlers->contentpath."/uploads/things/".$zthingid."-snapshot.png";
				$previewbrowsepath = $wtwhandlers->contenturl."/uploads/things/".$zthingid."-snapshot.png";
				$previewfilename = $zthingid."-snapshot.png";
			}
			$zfiledata = str_replace('data:image/png;base64,', '', $zfiledata);
			$zfiledata = str_replace(' ', '+', $zfiledata);
			$data1 = base64_decode($zfiledata);
			$zfile1 = $zfilepath1.$zfilename1;
			$zsuccess = file_put_contents($zfile1, $data1);
			$zfilepath = "";
			$zfiletitle = "";
			if ($zfilename1 == "defaultbuilding.png") {
				$zfiletitle = "defaultbuildingsm.png";
			} else if ($zfilename1 == "defaultcommunity.png") {				
				$zfiletitle = "defaultcommunitysm.png";
			} else if ($zfilename1 == "defaultthing.png") {				
				$zfiletitle = "defaultthingsm.png";
			}
			$zfilepath = $zfilepath1.$zfiletitle;
			$originalid = $wtwhandlers->getRandomString(16,2);
			$websizeid = $wtwhandlers->getRandomString(16,2);
			$this->resizeImage($zfile1, $previewpath, 512);
			$previewimagedetails = getimagesize($previewpath);
			$zpreviewwidth = $previewimagedetails[0];
			$zpreviewheight = $previewimagedetails[1];
			$zpreviewfilesize = filesize($previewpath);

			$zresults = $this->updateFileInDb($originalid,'original',$originalid,$websizeid,'',$previewfilename,$previewfilename,'png',$zpreviewfilesize,'image/png',null,$zpreviewwidth,$zpreviewheight,$previewbrowsepath);

			$this->resizeImage($zfile1, $zfilepath, 300);
			$imagedetails = getimagesize($zfilepath);
			$zwidth = $imagedetails[0];
			$zheight = $imagedetails[1];
			$zfilesize = filesize($zfilepath);
			$zfiledata = addslashes(file_get_contents($zfilepath));
			
			$zresults = $this->updateFileInDb($websizeid,'websize',$originalid,$websizeid,'',$zfiletitle,$zfiletitle,'png',$zfilesize,'image/png',$zfiledata,$zwidth,$zheight,$browsepath);
			foreach ($zresults as $zrow) {
				$zsnapshotid = $zrow["websizeid"];
				$zsnapshotpath = $zrow["filepath"];
				if (!empty($zrow["filedata"]) && isset($zrow["filedata"])) {
					$zsnapshotdata = "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["filedata"]));
				}
			}
			
			if (!empty($zthingid) && isset($zthingid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."things
					set  snapshotid='".$zsnapshotid."',
						 updatedate=now(),
						 updateuserid='".$wtwhandlers->userid."'
					where thingid='".$zthingid."';");
			} else if (!empty($zbuildingid) && isset($zbuildingid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildings
					set  snapshotid='".$zsnapshotid."',
						 updatedate=now(),
						 updateuserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid."';");
			} else if (!empty($zcommunityid) && isset($zcommunityid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set  snapshotid='".$zsnapshotid."',
						 updatedate=now(),
						 updateuserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-saveImageFilePng=".$e->getMessage());
		}	
		return array(
			'snapshotid' => $zsnapshotid,
			'snapshotpath' => $zsnapshotpath,
			'snapshotdata' => $zsnapshotdata);
	}
	
	public function resizeImage($originalFile, $ztargetfile, $newWidth) {
		global $wtwhandlers;
		try {
			$info = getimagesize($originalFile);
			$mime = $info['mime'];
			switch ($mime) {
					case 'image/jpeg':
							$image_create_func = 'imagecreatefromjpeg';
							$image_save_func = 'imagejpeg';
							$new_image_ext = 'jpg';
							break;
					case 'image/png':
							$image_create_func = 'imagecreatefrompng';
							$image_save_func = 'imagepng';
							$new_image_ext = 'png';
							break;
					case 'image/gif':
							$image_create_func = 'imagecreatefromgif';
							$image_save_func = 'imagegif';
							$new_image_ext = 'gif';
							break;
					default: 
							$image_create_func = 'imagecreatefrompng';
							$image_save_func = 'imagepng';
							$new_image_ext = 'png';
							break;
			}
			$issnapshot = strpos($originalFile, 'snapshot');
			$img = $image_create_func($originalFile);
			list($width, $height) = getimagesize($originalFile);
			$newHeight = ($height / $width) * $newWidth;
			$tmp = imagecreatetruecolor($newWidth, $newHeight);
			if (($mime == "image/png" || $mime == "image/gif") && $issnapshot === false) {
				imagecolortransparent($tmp, imagecolorallocate($tmp, 0, 0, 0));
				//imagealphablending( $zfilepath, false );
				//imagesavealpha( $zfilepath, true );
			}
			imagecopyresampled($tmp, $img, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
			if (file_exists($ztargetfile)) {
				unlink($ztargetfile);
			}
			$image_save_func($tmp, "$ztargetfile");
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-resizeImage=".$e->getMessage());
		}
	}
	
	public function uploadFileToDb($zfilepath, $zfiletitle, $zfilename, $zfileextension, $zfiletype, $public) {
		global $wtwhandlers;
		try {
			$zuploadid = "";
			$zuploadpath = "";
			$browsepath = "";
			$zwidth = null;
			$zheight = null;
			if ($public == '1') {
				$this->checkContentFolders('', '', '');
				$zuploadpath = $wtwhandlers->contentpath;
				if(isset($_SESSION['wtw_uploadpathid']) && !empty($_SESSION['wtw_uploadpathid'])) {
					$syear = date('Y');
					$smonth = date('m');
					$zuploadpath = $zuploadpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$syear."/".$smonth."/";
					$browsepath = $wtwhandlers->contenturl."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$syear."/".$smonth."/";
				} else {
					$public = '0';
				}
			}
			$zfiledata = null;
			if (strpos($zfiletype, 'image') > -1) {
				$zfiledata = addslashes(file_get_contents($zfilepath));
			}
			$issnapshot = strpos($zfilepath, 'snapshot');
			if (empty($zfiletitle)) {
				$zfiletitle = $zfilename;
			}
			if (strpos($zfiletype, 'image') > -1) {
				$imagedetails = getimagesize($zfilepath);
				$zwidth = $imagedetails[0];
				$zheight = $imagedetails[1];
			}
			$zfilesize = filesize($zfilepath);
			$zuserid = "";
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
			}
			if (!isset($zfilesize) && empty($zfilesize)) {
				$zfilesize = "null";
			}
			if (strpos($zfiletype, 'image') > -1) {
				if (!isset($zwidth) && empty($zwidth)) {
					$zwidth = imagesx($zfiledata);
					if (!isset($zwidth) && empty($zwidth)) {
						$zwidth = "null";
					}
				}
				if (!isset($zheight) && empty($zheight)) {
					$zheight = imagesy($zfiledata);
					if (!isset($zheight) && empty($zheight)) {
						$zheight = "null";
					}
				}
			} else {
				$zfiledata = null;
				$zwidth = "null";
				$zheight = "null";
			}
			if ($public == '1') {
				$zfilename = $this->avoidDuplicateFileNames($zuploadpath, $zfilename);
				copy($zfilepath, $zuploadpath.$zfilename);
			}
			$zresults = array();
			if(isset($zfiledata) && !empty($zfiledata)) {
				$zresults = $this->updateFileInDb('','original','','','',$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,$zfiledata,$zwidth,$zheight,$browsepath.$zfilename);
			} else {
				$zresults = $this->updateFileInDb('','original','','','',$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,null,$zwidth,$zheight,$browsepath.$zfilename);
			}
			foreach ($zresults as $zrow) {
				$zuploadid = $zrow["uploadid"];
			}
			if ($zuploadid != "" && strpos($zfiletype, 'image') > -1) {
				switch ($zfiletype) {
					case 'image/jpeg':
							$image_create_func = 'imagecreatefromjpeg';
							$image_save_func = 'imagejpeg';
							$new_image_ext = 'jpg';
							break;
					case 'image/png':
							$image_create_func = 'imagecreatefrompng';
							$image_save_func = 'imagepng';
							$new_image_ext = 'png';
							break;
					case 'image/gif':
							$image_create_func = 'imagecreatefromgif';
							$image_save_func = 'imagegif';
							$new_image_ext = 'gif';
							break;
					default: 
							$image_create_func = 'imagecreatefrompng';
							$image_save_func = 'imagepng';
							$new_image_ext = 'png';
							break;
				}
				$img = $image_create_func($zfilepath);
				$maxwidth = 512;
				$maxheight = 512;
				$scale = min($maxwidth/$zwidth, $maxheight/$zheight);
				$newwidth = ceil($scale*$zwidth);
				$newheight = ceil($scale*$zheight);
				$newimage = imagecreatetruecolor($newwidth, $newheight);
				if (($zfileextension == "png" || $zfileextension == "gif") && $issnapshot === false) {
					imagecolortransparent($newimage, imagecolorallocate($newimage, 0, 0, 0));
					//imagealphablending( $zfilepath, false );
					//imagesavealpha( $zfilepath, true );
				}
				imagecopyresampled($newimage, $img, 0, 0, 0, 0, $newwidth, $newheight, $zwidth, $zheight);
				if (file_exists($zfilepath)) {
					unlink($zfilepath);
				}
				$image_save_func($newimage, "$zfilepath");
				$zfilesize = filesize($zfilepath);
				$zfiledata = addslashes(file_get_contents($zfilepath));
				$websizeid = "";
				$newfilename = "";
				if ($public == '1') {
					$newfilename = $this->getNewFileName($zfilename, $newwidth, $newheight);
					copy($zfilepath, $zuploadpath.$newfilename);
				}
				$zresults = $this->updateFileInDb('','websize',$zuploadid,'','',$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,$zfiledata,$newwidth,$newheight,$browsepath.$newfilename);
				foreach ($zresults as $zrow) {
					$websizeid = $zrow["websizeid"];
				}
				$maxwidth = 80;
				$maxheight = 80;
				$scale = min($maxwidth/$zwidth, $maxheight/$zheight);
				$newwidth = ceil($scale*$zwidth);
				$newheight = ceil($scale*$zheight);
				$newimage = imagecreatetruecolor($newwidth, $newheight);
				if (($zfileextension == "png" || $zfileextension == "gif") && $issnapshot === false) {
					imagecolortransparent($newimage, imagecolorallocate($newimage, 0, 0, 0));
					//imagealphablending( $zfilepath, false );
					//imagesavealpha( $zfilepath, true );
				}
				imagecopyresampled($newimage, $img, 0, 0, 0, 0, $newwidth, $newheight, $zwidth, $zheight);
				if (file_exists($zfilepath)) {
					unlink($zfilepath);
				}
				$image_save_func($newimage, "$zfilepath");
				$zfilesize = filesize($zfilepath);
				$zfiledata = addslashes(file_get_contents($zfilepath));
				$newfilename = "";
				if ($public == '1') {
					$newfilename = $this->getNewFileName($zfilename, $newwidth, $newheight);
					copy($zfilepath, $zuploadpath.$newfilename);
				}
				$zresults = $this->updateFileInDb('','thumbnail',$zuploadid,$websizeid,'',$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,$zfiledata,$newwidth,$newheight,$browsepath.$newfilename);
				if (file_exists($zfilepath)) {
					unlink($zfilepath);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-uploadFileToDb=".$e->getMessage());
		}
	}
	
	public function avoidDuplicateFileNames($zuploadpath, $zfilename) {
		global $wtwhandlers;
		try {
			if (file_exists($zuploadpath.$zfilename)) {
				$path_parts = pathinfo($zfilename);
				$ext = $path_parts['extension'];
				$zfile = $path_parts['filename'];
				$x = 1;
				while (file_exists($zuploadpath.$zfilename)) {
					$zfilename = $zfile."-".$x.".".$ext;
					$x += 1;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-avoidDuplicateFileNames=".$e->getMessage());
		}
		return $zfilename;
	}
	
	public function getNewFileName($zfilename, $newwidth, $newheight) {
		global $wtwhandlers;
		try {
			$path_parts = pathinfo($zfilename);
			$ext = $path_parts['extension'];
			$zfile = $path_parts['filename'];
			$zfilename = $zfile."-".ceil($newwidth)."x".ceil($newheight).".".$ext;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getNewFileName=".$e->getMessage());
		}
		return $zfilename;
	}
	
	public function uploadObjectFileToDb($zfilepath, $zfilename, $zfileextension, $zfiletype) {
		global $wtwhandlers;
		try {
			$zuploadid = "";
			$zuploadpath = "";
			$browsepath = "";
			$zobjectfolder = "";
			$this->checkContentFolders('', '', '');
			$zuploadpath = $wtwhandlers->contentpath;
			if(isset($_SESSION['wtw_uploadpathid']) && !empty($_SESSION['wtw_uploadpathid'])) {
				$pathname = pathinfo('/'.$zfilename);
				$newfolder = $pathname['filename'];
				if (!file_exists($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder)) {
					mkdir($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder, 0777);
				}
				$zuploadpath = $zuploadpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder."/";
				$browsepath = $wtwhandlers->contenturl."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder."/";
				$zobjectfolder = "/content/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder."/";
			}
			$zfilesize = filesize($zfilepath);
			if (!isset($zfilesize) && empty($zfilesize)) {
				$zfilesize = "null";
			}
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				$zfilename = $this->avoidDuplicateFileNames($zuploadpath, $zfilename);
				copy($zfilepath, $zuploadpath.$zfilename);
				$zuploadobjectid = $wtwhandlers->getRandomString(16,1);
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."uploadobjects
						(uploadobjectid,
						 userid,
						 objectfolder,
						 objectfile,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
					values
						('".$zuploadobjectid."',
						 '".$wtwhandlers->userid."',
						 '".$zobjectfolder."',
						 '".$zfilename."',
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-uploadObjectFileToDb=".$e->getMessage());
		}
	}
	
	public function setUploadVisibility($zthumbnailid, $zhide) {
		global $wtwhandlers;
		try {
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				if ($zhide == 1 || $zhide == "1") {
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploads
						set hide=1,
							hidedate=now(),
							hideuserid='".$wtwhandlers->userid."'
						where ((thumbnailid='".$zthumbnailid."') 
							or uploadid='".$zthumbnailid."')
							and not thumbnailid=''
							and userid='".$wtwhandlers->userid."';");
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploads
						set hide=0,
							hidedate=NULL,
							hideuserid=''
						where ((thumbnailid='".$zthumbnailid."') 
							or uploadid='".$zthumbnailid."')
							and not thumbnailid=''
							and userid='".$wtwhandlers->userid."';");
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-setUploadVisibility=".$e->getMessage());
		}
	}

	public function importWebImages($zmoldgroup, $zwebid, $zcopywebid, $zwebimagesbulk) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				if (!empty($zwebimagesbulk)) {
					$zwebimagesbulk = base64_decode($zwebimagesbulk);
					$zwebimages = json_decode($zwebimagesbulk);
					$zrecordeach = 50 / count($zwebimages);
					$i = 50;
					foreach ($zwebimages as $zrow) {
						$zwebimageid = $wtwhandlers->getRandomString(16,1);
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
								('".$zwebimageid."', 
								 '".$zrow->webimageid."', 
								 '".$zrow->communitymoldid."', 
								 '".$zrow->buildingmoldid."', 
								 '".$zrow->thingmoldid."', 
								 ".$wtwhandlers->checkNumber($zrow->imageindex,0).", 
								 '".$zrow->imageid."', 
								 '".$zrow->imagehoverid."', 
								 '".$zrow->imageclickid."', 
								 ".$wtwhandlers->checkNumber($zrow->graphiclevel,0).", 
								 '".$zrow->jsfunction."', 
								 '".$zrow->jsparameters."', 
								 '".$wtwhandlers->userid."', 
								 '".$zrow->alttag."', 
								 now(),
								 '".$wtwhandlers->userid."',
								 now(),
								 '".$wtwhandlers->userid."');");
						$i += $zrecordeach;
					}
					/* update foreign keys to new webimageids (updating moldids) */
					$wtwhandlers->query("
						update ".wtw_tableprefix."webimages t1
							inner join ".wtw_tableprefix.$zmoldgroup."molds t2
							on t1.".$zmoldgroup."moldid=t2.past".$zmoldgroup."moldid
						set t1.".$zmoldgroup."moldid=t2.".$zmoldgroup."moldid
						where t2.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."moldid='')
							and (not t2.".$zmoldgroup."moldid is null);");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-importWebImages=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function importUploads($zmoldgroup, $zwebid, $zcopywebid, $zuploadsbulk) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				if (!empty($zuploadsbulk)) {
					$zuploadsbulk = base64_decode($zuploadsbulk);
					$zuploads = json_decode($zuploadsbulk);
					$zcommunityid = '';
					$zbuildingid = '';
					$zthingid = '';
					switch ($zmoldgroup) {
						case "community":
							$zcommunityid = $zwebid;
							break;
						case "building":
							$zbuildingid = $zwebid;
							break;
						case "thing":
							$zthingid = $zwebid;
							break;
					}
					$this->checkContentFolders($zcommunityid, $zbuildingid, $zthingid);
					$zrecordeach = 20 / count($zuploads);
					$i = 80;
					foreach ($zuploads as $zrow) {
						$zuploadid = $wtwhandlers->getRandomString(16,1);
						$zfiledata = null;
						if (isset($zrow->filedata) && !empty($zrow->filedata)) {
							$zfiledata = addslashes(base64_decode($zrow->filedata));
						}
						if(isset($zfiledata) && !empty($zfiledata)) {
							$fileresults = $this->writeDataToFile($zrow->filedata, $zmoldgroup, $zwebid, $zrow->filename);
							$filename = $fileresults["filename"];
							$filepath = $fileresults["filepath"];
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."uploads
									(uploadid, 
									 pastuploadid, 
									 originalid, 
									 websizeid, 
									 thumbnailid, 
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
									 userid, 
									 createdate,
									 createuserid,
									 updatedate,
									 updateuserid)
								values
									('".$zuploadid."', 
									 '".$zrow->uploadid."', 
									 '".$zrow->originalid."', 
									 '".$zrow->websizeid."', 
									 '".$zrow->thumbnailid."', 
									 '".$zrow->filetitle."', 
									 '".$filename."', 
									 '".$zrow->fileextension."', 
									 ".$wtwhandlers->checkNumber($zrow->filesize,0).", 
									 '".$zrow->filetype."', 
									 '".$filepath."', 
									 '".$zfiledata."', 
									 ".$wtwhandlers->checkNumber($zrow->imagewidth,1).", 
									 ".$wtwhandlers->checkNumber($zrow->imageheight,1).", 
									 0, 
									 '".$zrow->userid."', 
									 now(),
									 '".$wtwhandlers->userid."',
									 now(),
									 '".$wtwhandlers->userid."');");
						} else {
							$fileresults = $this->writeFileFromPath($zrow->filepath, $zmoldgroup, $zwebid, $zrow->filename);
							$filename = $fileresults["filename"];
							$filepath = $fileresults["filepath"];
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."uploads
									(uploadid, 
									 pastuploadid, 
									 originalid, 
									 websizeid, 
									 thumbnailid, 
									 filetitle, 
									 filename, 
									 fileextension, 
									 filesize, 
									 filetype, 
									 filepath, 
									 imagewidth, 
									 imageheight, 
									 stock, 
									 userid, 
									 createdate,
									 createuserid,
									 updatedate,
									 updateuserid)
								values
									('".$zuploadid."', 
									 '".$zrow->uploadid."', 
									 '".$zrow->originalid."', 
									 '".$zrow->websizeid."', 
									 '".$zrow->thumbnailid."', 
									 '".$zrow->filetitle."', 
									 '".$filename."', 
									 '".$zrow->fileextension."', 
									 ".$wtwhandlers->checkNumber($zrow->filesize,0).", 
									 '".$zrow->filetype."', 
									 '".$filepath."', 
									 ".$wtwhandlers->checkNumber($zrow->imagewidth,1).", 
									 ".$wtwhandlers->checkNumber($zrow->imageheight,1).", 
									 ".$wtwhandlers->checkNumber($zrow->stock,0).", 
									 '".$zrow->userid."', 
									 now(),
									 '".$wtwhandlers->userid."',
									 now(),
									 '".$wtwhandlers->userid."');");
						}
						$wtwhandlers->query("
							update ".wtw_tableprefix."uploads
							set originalid='".$zuploadid."'
							where originalid='".$zrow->uploadid."';");
						$wtwhandlers->query("
							update ".wtw_tableprefix."uploads
							set websizeid='".$zuploadid."'
							where websizeid='".$zrow->uploadid."';");
						$wtwhandlers->query("
							update ".wtw_tableprefix."uploads
							set thumbnailid='".$zuploadid."'
							where thumbnailid='".$zrow->uploadid."';"); 
						$i += $zrecordeach;
					}
					/* update foreign keys to new uploadids */
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.textureid=t2.pastuploadid
						set t1.textureid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.textureid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumpid=t2.pastuploadid
						set t1.texturebumpid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebumpid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturehoverid=t2.pastuploadid
						set t1.texturehoverid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturehoverid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.videoid=t2.pastuploadid
						set t1.videoid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.videoid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.videoposterid=t2.pastuploadid
						set t1.videoposterid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.videoposterid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.heightmapid=t2.pastuploadid
						set t1.heightmapid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.heightmapid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.mixmapid=t2.pastuploadid
						set t1.mixmapid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.mixmapid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturerid=t2.pastuploadid
						set t1.texturerid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturerid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturegid=t2.pastuploadid
						set t1.texturegid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturegid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebid=t2.pastuploadid
						set t1.texturebid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumprid=t2.pastuploadid
						set t1.texturebumprid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebumprid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumpgid=t2.pastuploadid
						set t1.texturebumpgid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebumpgid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumpbid=t2.pastuploadid
						set t1.texturebumpbid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebumpbid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.soundid=t2.pastuploadid
						set t1.soundid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.soundid='')
							and (not t2.uploadid is null);");

					$wtwhandlers->query("
						update ".wtw_tableprefix."webimages t1
							inner join ".wtw_tableprefix.$zmoldgroup."molds t3
								on t1.".$zmoldgroup."moldid=t3.".$zmoldgroup."moldid
							inner join ".wtw_tableprefix."uploads t2
								on t1.imageid=t2.pastuploadid
						set t1.imageid=t2.uploadid
						where t3.".$zmoldgroup."id='".$zwebid."'
							and (not t3.".$zmoldgroup."id='')
							and (not t1.imageid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix."webimages t1
							inner join ".wtw_tableprefix.$zmoldgroup."molds t3
								on t1.".$zmoldgroup."moldid=t3.".$zmoldgroup."moldid
							inner join ".wtw_tableprefix."uploads t2
								on t1.imagehoverid=t2.pastuploadid
						set t1.imagehoverid=t2.uploadid
						where t3.".$zmoldgroup."id='".$zwebid."'
							and (not t3.".$zmoldgroup."id='')
							and (not t1.imagehoverid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix."webimages t1
							inner join ".wtw_tableprefix.$zmoldgroup."molds t3
								on t1.".$zmoldgroup."moldid=t3.".$zmoldgroup."moldid
							inner join ".wtw_tableprefix."uploads t2
								on t1.imageclickid=t2.pastuploadid
						set t1.imageclickid=t2.uploadid
						where t3.".$zmoldgroup."id='".$zwebid."'
							and (not t3.".$zmoldgroup."id='')
							and (not t1.imageclickid='')
							and (not t2.uploadid is null);");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-importUploads=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function writeDataToFile($zbase64data, $zmoldgroup, $zwebid, $zfilename) {
		global $wtwhandlers;
		$znewfilename = "";
		$znewfilepath = "";
		try {
			$zmoldgrouppath = "misc";
			switch ($zmoldgroup) {
				case "community":
					$zmoldgrouppath = "communities";
					break;
				case "building":
					$zmoldgrouppath = "buildings";
					break;
				case "thing":
					$zmoldgrouppath = "things";
					break;
			}
			$zfilepath = $wtwhandlers->contentpath."/uploads/".$zmoldgrouppath."/".$zwebid."/";
			$zbrowsepath = $wtwhandlers->contenturl."/uploads/".$zmoldgrouppath."/".$zwebid."/";
			$znewfilename = $this->avoidDuplicateFileNames($zfilepath, $zfilename);
			$zdata1 = base64_decode($zbase64data);
			$znewfilepath = $zbrowsepath.$znewfilename;
			$zsuccess = file_put_contents($zfilepath.$znewfilename, $zdata1);		
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-writeDataToFile=".$e->getMessage());
		}
		return array(
			'filename' => $znewfilename,
			'filepath' => $znewfilepath);
	}
	
	public function writeFileFromPath($zfromurl, $zmoldgroup, $zwebid, $zfilename) {
		global $wtwhandlers;
		$znewfilename = "";
		$znewfilepath = "";
		try {
			if (isset($zfromurl) && !empty($zfromurl)) {
				$zmoldgrouppath = "misc";
				switch ($zmoldgroup) {
					case "community":
						$zmoldgrouppath = "communities";
						break;
					case "building":
						$zmoldgrouppath = "buildings";
						break;
					case "thing":
						$zmoldgrouppath = "things";
						break;
				}
				$zfilepath = $wtwhandlers->contentpath."/uploads/".$zmoldgrouppath."/".$zwebid."/";
				$zbrowsepath = $wtwhandlers->contenturl."/uploads/".$zmoldgrouppath."/".$zwebid."/";
				$znewfilename = $this->avoidDuplicateFileNames($zfilepath, $zfilename);
				$znewfilepath = $zbrowsepath.$znewfilename;
				
				if(ini_get('allow_url_fopen') ) {
					$zdata1 = file_get_contents($zfromurl);
					$zsuccess = file_put_contents($zfilepath.$znewfilename, $zdata1);			
				} else if (extension_loaded('curl')) {
					$getfile = curl_init($zfromurl);
					$openfile = fopen($zfilepath.$znewfilename, 'wb');
					curl_setopt($getfile, CURLOPT_FILE, $openfile);
					curl_setopt($getfile, CURLOPT_HEADER, 0);
					curl_exec($getfile);
					curl_close($getfile);
					fclose($openfile);
				} else {
					$znewfilename = $zfilename;
					$znewfilepath = $zfromurl;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-writeFileFromPath=".$e->getMessage());
		}
		return array(
			'filename' => $znewfilename,
			'filepath' => $znewfilepath);
	}
	
	public function setKeyHash($zkey, $zmoldgroup, $zwebid) {
		global $wtwhandlers;
		try {
			if (!empty($zkey) && isset($zkey)) {
				$zkey = base64_decode($zkey);
				$options = ['cost' => 11];
				$zkeyhash = password_hash($zkey, PASSWORD_DEFAULT, $options);
				switch ($zmoldgroup) {
					case "community":
						$wtwhandlers->query("
							update ".wtw_tableprefix."communities
							set sharehash='".$zkeyhash."'
							where communityid='".$zwebid."';");
						break;
					case "building":
						
						break;
					case "thing":
						
						break;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getKeyHash=".$e->getMessage());
		}
		return $zkey;
	}

	public function saveWebAlias($zwebaliasid,$zforcehttps,$zdomainname,$zcommunitypublishname,$zbuildingpublishname,$zthingpublishname,$zcommunityid,$zbuildingid,$zthingid) {
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("Admin")) {
				/* check to see if web alias is already in use - if so - update it */
				$zresponse = $wtwhandlers->query("
					select * from ".wtw_tableprefix."webaliases
					where lower(domainname)=lower('".$zdomainname."')
						and lower(communitypublishname)=lower('".$zcommunitypublishname."')
						and lower(buildingpublishname)=lower('".$zbuildingpublishname."')
						and lower(thingpublishname)=lower('".$zthingpublishname."')
					limit 1;");
				if (count($zresponse) > 0) {
					foreach ($zresponse as $zrow) {
						$zwebaliasid = $zrow["webaliasid"];
					}
				} else {
					/* check if passed webaliasid exists */
					$zresponse = $wtwhandlers->query("
						select * from ".wtw_tableprefix."webaliases
						where webaliasid='".$zwebaliasid."'
							and not webaliasid=''
						limit 1;");
					if (count($zresponse) == 0) {
						$zwebaliasid = "";
					}
				}
				/* update or insert new webalias */
				if (empty($zwebaliasid) || !isset($zwebaliasid)) {
					$zwebaliasid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."webaliases
						   (webaliasid,
							forcehttps,
							domainname,
							webalias,
							communityid,
							communitypublishname,
							buildingid,
							buildingpublishname,
							thingid,
							thingpublishname,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zwebaliasid."',
							".$zforcehttps.",
							'".$zdomainname."',
							'".$zdomainname."',
							'".$zcommunityid."',
							'".$zcommunitypublishname."',
							'".$zbuildingid."',
							'".$zbuildingpublishname."',
							'".$zthingid."',
							'".$zthingpublishname."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."webaliases
						set forcehttps=".$zforcehttps.",
							domainname='".$zdomainname."',
							webalias='".$zdomainname."',
							communityid='".$zcommunityid."',
							communitypublishname='".$zcommunitypublishname."',
							buildingid='".$zbuildingid."',
							buildingpublishname='".$zbuildingpublishname."',
							thingid='".$zthingid."',
							thingpublishname='".$zthingpublishname."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."',
							deleteddate=null,
							deleteduserid='',
							deleted=0
						where webaliasid='".$zwebaliasid."'
						limit 1;");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-saveWebAlias=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function deleteWebAlias($zwebaliasid) {
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("Admin")) {
				/* update or insert new webalias */
				if (!empty($zwebaliasid) && isset($zwebaliasid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."webaliases
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where webaliasid='".$zwebaliasid."'
						limit 1;");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-deleteWebAlias=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function hasTransparency($zfiledata) {
		$zhastransparency = false;
		try {
			if (is_resource($zfiledata)) {
				$shrinkFactor      = 64.0;
				$minSquareToShrink = 64.0 * 64.0;
				$width  = imagesx($zfiledata);
				$height = imagesy($zfiledata);
				$square = $width * $height;
				if ($square <= $minSquareToShrink) {
					$thumb = $zfiledata;
					$thumbWidth = $width;
					$thumbHeight = $height;
				} else {
					$thumbSquare = $square / $shrinkFactor;
					$thumbWidth  = (int) round($width / sqrt($shrinkFactor));
					$thumbWidth < 1 and $thumbWidth = 1;
					$thumbHeight = (int) round($thumbSquare / $thumbWidth);
					$thumb       = imagecreatetruecolor($thumbWidth, $thumbHeight);
					imagealphablending($thumb, false);
					imagecopyresized($thumb, $zfiledata, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $width, $height);
				}
				for ($i = 0; $i < $thumbWidth; $i++) { 
					for ($j = 0; $j < $thumbHeight; $j++) {
						if (imagecolorat($thumb, $i, $j) & 0x7F000000) {
							$zhastransparency = true;
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-hasTransparency=".$e->getMessage());
		}
		return $zhastransparency;
	}
	
	
	public function getUploadedFiles() {
		global $wtwhandlers;
		$zresults = array();
		try {
			$zresults = $wtwhandlers->query("
				select *
				from ".wtw_tableprefix."uploadobjects
				where userid='".$wtwhandlers->userid."'
					or stock=1
				order by createdate desc, objectfile, objectfolder, uploadobjectid;");
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getUploadedFiles=".$e->getMessage());
		}
		return $zresults;
	}

	public function getUploadedFileNameDetails($zuploadobjectid) {
		global $wtwhandlers;
		$zresults = array();
		try {
			$zresults = $wtwhandlers->query("
				select *
				from ".wtw_tableprefix."uploadobjects
				where (userid='".$wtwhandlers->userid."'
						or stock=1)
						and uploadobjectid='".$zuploadobjectid."'
				limit 1;");
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getUploadedFileNameDetails=".$e->getMessage());
		}
		return $zresults;
	}

	public function getUploadedFileFilesDetails($zobjectfolder) {
		global $wtwhandlers;
		$zresults = array();
		try {
			$i = 0;
			$dir = str_replace('/content',$wtwhandlers->contentpath,$zobjectfolder);
			$dir = rtrim($dir, "/");
			if (is_dir($dir)) {
				if ($dh = opendir($dir)) {
					while (($zfile = readdir($dh)) !== false) {
						if ($zfile != '.' && $zfile != '..') {
							$zresults[$i] = array(
								'file'=> $zfile
							);
							$i += 1;
						}
					}
					closedir($dh);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getUploadedFileFilesDetails=".$e->getMessage());
		}
		return $zresults;
	}
	
	public function uploadFile($zuploadfile) {
		global $wtwhandlers;
		try {
			$this->checkContentFolders('', '', '');
			$zitem = $wtwhandlers->getVal("item","");	
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zfilepath = $wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/media";
				$zfileurl = $wtwhandlers->contenturl."/uploads/users/".$_SESSION['wtw_uploadpathid']."/media/";
				$zisvalid = 1;
				$zpastfilename = basename($zuploadfile["name"]);
				$zfileextension = pathinfo($zfilepath."/". $zpastfilename,PATHINFO_EXTENSION);
				$zfilesize = $zuploadfile["size"];
				$zfiletype = $zuploadfile["type"];
				$zfilename = $wtwhandlers->getRandomString(16,1).".".$zfileextension;
				$ztargetfile = $zfilepath."/".$zfilename;
				if (file_exists($ztargetfile)) {
					echo "File already exists.";
					$zisvalid = 0;
				}
				if ($zfilesize > 128000000) {
					echo "Your file is too large.";
					$zisvalid = 0;
				}
				if(strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "obj") {
					echo "Only babylon, gltf, glb, and obj files are allowed at this time.";
					$zisvalid = 0;
				}
				if ($zisvalid == 0) {
					echo "Your file was not uploaded.";
				} else {
					if (move_uploaded_file($zuploadfile["tmp_name"], $ztargetfile)) {
						$this->uploadObjectFileToDb($ztargetfile, $zpastfilename, $zfileextension, $zfiletype);
					} else {
						echo "There was an error uploading your file.";
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-uploadFile=".$e->getMessage());
		}
	}

	public function uploadFiles($zuploadfiles, $zitem) {
		global $wtwhandlers;
		$serror = "";
		try {
			$this->checkContentFolders('', '', '');
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zfilepath = $wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/media/";
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
				for ($i = 0; $i < count($zuploadfiles["name"]);$i++) {
					$zisvalid = 1;
					$zpastfilename = basename($zuploadfiles["name"][$i]);
					$zfileextension = pathinfo($zfilepath."/". $zpastfilename,PATHINFO_EXTENSION);
					$zfilesize = $zuploadfiles["size"][$i];
					$zfiletype = $zuploadfiles["type"][$i];
					$ztargetfile = $zfilepath."/".$zpastfilename;
					if ($zfilesize > 128000000) {
						$serror .= "Your file is too large.";
						$zisvalid = 0;
					}
					if((!strpos($zitem, 'sound') > -1) && (!strpos($zitem, 'audio') > -1) && strtolower($zfileextension) != "jpg" && strtolower($zfileextension) != "png" && strtolower($zfileextension) != "jpeg" && strtolower($zfileextension) != "gif" && strtolower($zfileextension) != "mp4" && strtolower($zfileextension) != "webm" && strtolower($zfileextension) != "ogv") {
						echo "Only JPG, JPEG, PNG, GIF, MP4, OGV, and WEBM files are allowed.";
						$zisvalid = 0;
					} elseif((strpos($zitem, 'sound') > -1) && strtolower($zfileextension) != "wav" && strtolower($zfileextension) != "mp3" && strtolower($zfileextension) != "wma" && strtolower($zfileextension) != "m4a") {
						echo "Only WAV, MP3, M4A, and WMA files are allowed.";
						$zisvalid = 0;
					} 
					if ($zisvalid == 1) {
						if (move_uploaded_file($zuploadfiles["tmp_name"][$i], $ztargetfile)) {
							$this->uploadFileToDb($ztargetfile, '', $zpastfilename, $zfileextension, $zfiletype, '1'); 
						} else {
							$serror .= "There was an error uploading your files.";
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-uploadFiles=".$e->getMessage());
		}
		return $serror;
	}

	public function uploadObjectFiles($zuploadfiles, $zobjectfilepart) {
		global $wtwhandlers;
		$serror = "";
		try {
			$this->checkContentFolders('', '', '');
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zfilepath = $wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$zobjectfilepart;
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
				for ($i = 0; $i < count($zuploadfiles["name"]);$i++) {
					$zisvalid = 1;
					$zpastfilename = basename($zuploadfiles["name"][$i]);
					$zfileextension = pathinfo($zfilepath."/". $zpastfilename,PATHINFO_EXTENSION);
					$zfilesize = $zuploadfiles["size"][$i];
					$zfiletype = $zuploadfiles["type"][$i];
					$ztargetfile = $zfilepath."/".$zpastfilename;
					if ($zfilesize > 128000000) {
						$serror .= "Your file is too large.";
						$zisvalid = 0;
					}
					if(strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "manifest" && strtolower($zfileextension) != "txt" && strtolower($zfileextension) != "jpg" && strtolower($zfileextension) != "png" && strtolower($zfileextension) != "jpeg" && strtolower($zfileextension) != "gif" && strtolower($zfileextension) != "wav" && strtolower($zfileextension) != "mp3" && strtolower($zfileextension) != "mp4" && strtolower($zfileextension) != "webm" && strtolower($zfileextension) != "ogv" && strtolower($zfileextension) != "bin" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "bgltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "blend" && strtolower($zfileextension) != "blend1" && strtolower($zfileextension) != "obj" && strtolower($zfileextension) != "fbx" && strtolower($zfileextension) != "log") {
						$serror .= "Only babylon, gltf, glb, obj, blend, and image files are allowed at this time.";
						$zisvalid = 0;
					}
					if ($zisvalid == 1) {
						if (move_uploaded_file($zuploadfiles["tmp_name"][$i], $ztargetfile)) {
/*							$this->uploadFileToDb($ztargetfile, '', $zpastfilename, $zfileextension, $zfiletype, '1'); */
						} else {
							$serror .= "There was an error uploading your files.";
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-uploadObjectFiles=".$e->getMessage());
		}
		return $serror;
	}

	public function uploadJavaScriptFiles($zuploadfiles, $zmoldgroup, $zwebid, $zactionzoneid) {
		global $wtwhandlers;
		$serror = "";
		try {
			$this->checkContentFolders('', '', '');
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zfilepath = $wtwhandlers->contentpath."/uploads/".$zmoldgroup."/".$zwebid;
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
				for ($i = 0; $i < count($zuploadfiles["name"]);$i++) {
					$zisvalid = 1;
					$zpastfilename = basename($zuploadfiles["name"][$i]);
					$zfileextension = pathinfo($zfilepath."/". $zpastfilename,PATHINFO_EXTENSION);
					$zfilesize = $zuploadfiles["size"][$i];
					$zfiletype = $zuploadfiles["type"][$i];
					$ztargetfile = $zfilepath."/".$zpastfilename;
					if ($zfilesize > 2000000) {
						$serror .= "Your file is too large.";
						$zisvalid = 0;
					}
					if(strtolower($zfileextension) != "js") {
						$serror .= "Only JavaScript (.js) files are allowed.";
						$zisvalid = 0;
					}
					if ($zisvalid == 1) {
						if (move_uploaded_file($zuploadfiles["tmp_name"][$i], $ztargetfile)) {
							$this->saveJavaScriptFile($zactionzoneid, $zmoldgroup, $zwebid, $zpastfilename);
						} else {
							$serror .= "There was an error uploading your files.";
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-uploadJavaScriptFiles=".$e->getMessage());
		}
		return $serror;
	}

	public function saveJavaScriptFile($zactionzoneid, $zmoldgroup, $zwebid, $zscriptpath) {
		global $wtwhandlers;
		try {
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				if (strlen($zscriptpath) > 4) {
					$zscriptname = str_replace(".js","",strtolower($zscriptpath));
					$zscriptid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."scripts
							   (scriptid,
								actionzoneid,
								moldgroup,
								webid,
								scriptname,
								scriptpath,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zscriptid."',
								'".$zactionzoneid."',
								'".$zmoldgroup."',
								'".$zwebid."',
								'".$zscriptname."',
								'".$zscriptpath."',
								now(),
								'".$wtwhandlers->userid."',
								now(),
								'".$wtwhandlers->userid."');");
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-saveJavaScriptFile=".$e->getMessage());
		}
	}

//deleteJavaScriptFile($zwebid, $zactionzoneid, $zscriptid)
	public function deleteJavaScriptFile($zmoldgroup, $zwebid, $zactionzoneid, $zscriptid, $zscriptpath) {
		global $wtwhandlers;
		$serror = "";
		try {
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zfilepath = $wtwhandlers->contentpath."/uploads/".$zmoldgroup."/".$zwebid."/".$zscriptpath;
				if (file_exists($zfilepath)) {
					/* uncomment if you want the file to be deleted */
					/* unlink($zfilepath); */
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."scripts
					set deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."',
						deleted=1
					where scriptid='".$zscriptid."'
						and actionzoneid='".$zactionzoneid."'
						and webid='".$zwebid."';");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-deleteObjectFile=".$e->getMessage());
		}
		return $serror;
	}



	public function deleteObjectFile($zfilename, $zobjectfilepart) {
		global $wtwhandlers;
		$serror = "";
		try {
			$zfilepath = $wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$zobjectfilepart."/".$zfilename;
			if (file_exists($zfilepath)) {
				unlink($zfilepath);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-deleteObjectFile=".$e->getMessage());
		}
		return $serror;
	}

	public function getMyImages($zcategory, $zhide) {
		global $wtwhandlers;
		$zresults = array();
		try {
			$zresults = $wtwhandlers->query("
				select u1.*,
					case when u1.websizeid='' then ''
						else (select filepath 
								from ".wtw_tableprefix."uploads 
								where uploadid=u1.websizeid limit 1)
					end as websizepath,
					case when u1.originalid='' then ''
						else (select filepath 
								from ".wtw_tableprefix."uploads 
								where uploadid=u1.originalid limit 1)
					end as originalpath
				from ".wtw_tableprefix."uploads u1
				where u1.deleted=0
					and u1.userid='".$wtwhandlers->userid."'
					and u1.hide=".$zhide."
					and case when '".$zcategory."' = 'image' then 
							(u1.thumbnailid = u1.uploadid and u1.filetype like '%image%')
						when '".$zcategory."' = 'video' then
							(u1.filetype like '%video%')
						when '".$zcategory."' = 'audio' then
							(u1.filetype like '%audio%')
						when '".$zcategory."' = 'doc' then
							(u1.filetype like '%pdf%' 
								or u1.filetype like '%doc%' 
								or u1.filetype like '%log%' 
								or u1.filetype like '%txt%' 
								or u1.filetype like '%rtf%')
						else
							(u1.thumbnailid = u1.uploadid
							and u1.filetype like '%image%')
							or (u1.filetype like '%video%')
							or (u1.filetype like '%audio%')
						end
				order by u1.updatedate desc, u1.createdate desc, u1.filename, u1.uploadid;");
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getMyImages=".$e->getMessage());
		}
		return $zresults;
	}

	public function getStockImages($zitem) {
		global $wtwhandlers;
		$zresults = array();
		try {
			if (strpos($zitem, 'sound')) {
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."uploads
					where deleted=0
						and stock='1'
						and uploads.filetype like '%audio%'
					order by updatedate desc, createdate desc, filename, uploadid;");
			} else {
				$zresults = $wtwhandlers->query("
					select u1.*,
						u2.filepath as websizepath,
						u3.filepath as originalpath
					from ".wtw_tableprefix."uploads u1
						left join ".wtw_tableprefix."uploads u2
							on u1.websizeid=u2.uploadid
						left join ".wtw_tableprefix."uploads u3
							on u1.originalid=u3.uploadid
					where u1.deleted=0
						and u1.stock='1'
						and u1.thumbnailid = u1.uploadid
						and u1.filetype like '%image%'
					order by u1.updatedate desc, u1.createdate desc, u1.filename, u1.uploadid;");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getStockImages=".$e->getMessage());
		}
		return $zresults;
	}
	
	public function getCommunityImages($zcommunityid, $zbuildingid, $zthingid) {
		global $wtwhandlers;
		$zresults = array();
		try {
			$zmoldgroup = "";
			$ztable = "";
			$zwebid = "";
			if (!empty($zcommunityid) && isset($zcommunityid)) {
				$zmoldgroup = "community";
				$ztable = "communities";
				$zwebid = $zcommunityid;
			} else if (!empty($zbuildingid) && isset($zbuildingid)) {
				$zmoldgroup = "building";
				$ztable = "buildings";
				$zwebid = $zbuildingid;
			} else if (!empty($zthingid) && isset($zthingid)) {
				$zmoldgroup = "thing";
				$ztable = "things";
				$zwebid = $zthingid;
			}
			$zresults = $wtwhandlers->query("
				select uploads.uploadid,
					uploads.originalid,
					uploads.websizeid,
					uploads.thumbnailid,
					uploads.userid,
					uploads.filetitle,
					uploads.filename,
					uploads.fileextension,
					uploads.filesize,
					uploads.filetype,
					uploads.filepath,
					u2.filepath as websizepath,
					u3.filepath as originalpath,
					max(uploads.filedata) as filedata,
					uploads.imagewidth,
					uploads.imageheight,
					uploads.stock,
					uploads.createdate,
					uploads.updatedate,
					uploads.updateuserid
				from ".wtw_tableprefix."uploads uploads
						inner join (select u1.thumbnailid  
							from ".wtw_tableprefix."uploads u1 
								inner join (select t1.textureid, t1.texturehoverid, t1.heightmapid, w1.imageid, w1.imagehoverid 
									from ".wtw_tableprefix.$zmoldgroup."molds t1
									left join ".wtw_tableprefix."webimages w1 
										on t1.".$zmoldgroup."moldid=w1.".$zmoldgroup."moldid 
									where t1.".$zmoldgroup."id='".$zwebid."' 
										and (not t1.textureid='' 
										or not t1.texturehoverid='' 
										or not t1.heightmapid=''
										or not w1.imageid='' 
										or not w1.imagehoverid='')) t2
									on u1.thumbnailid = t2.textureid
									or u1.thumbnailid = t2.texturehoverid
									or u1.thumbnailid = t2.heightmapid
									or u1.thumbnailid = t2.imageid
									or u1.thumbnailid = t2.imagehoverid
									or u1.websizeid = t2.textureid
									or u1.websizeid = t2.texturehoverid
									or u1.websizeid = t2.heightmapid
									or u1.websizeid = t2.imageid
									or u1.websizeid = t2.imagehoverid
									or u1.originalid = t2.textureid
									or u1.originalid = t2.texturehoverid
									or u1.originalid = t2.heightmapid
									or u1.originalid = t2.imageid
									or u1.originalid = t2.imagehoverid
							where u1.deleted=0
								and u1.filetype like '%image%'
								and (not u1.thumbnailid='')
							group by u1.thumbnailid) thumbnails
						on uploads.thumbnailid=thumbnails.thumbnailid
					left join ".wtw_tableprefix."uploads u2
						on uploads.websizeid=u2.uploadid
					left join ".wtw_tableprefix."uploads u3
						on uploads.originalid=u3.uploadid
				where
					uploads.uploadid=uploads.thumbnailid
				group by uploads.uploadid,
					uploads.originalid,
					uploads.websizeid,
					uploads.thumbnailid,
					uploads.userid,
					uploads.filetitle,
					uploads.filename,
					uploads.fileextension,
					uploads.filesize,
					uploads.filetype,
					uploads.filepath,
					u2.filepath,
					u3.filepath,
					uploads.imagewidth,
					uploads.imageheight,
					uploads.stock,
					uploads.createdate,
					uploads.updatedate,
					uploads.updateuserid;");
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getCommunityImages=".$e->getMessage());
		}
		return $zresults;
	}
	
	function toggleHideMyImage($zuploadid, $zhide) {
		global $wtwhandlers;
		$zresults = array();
		try {
			$zresults = $wtwhandlers->query("
				update ".wtw_tableprefix."uploads
				set hide=".$zhide."
				where uploadid='".$zuploadid."'
				limit 1;");
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-toggleHideMyImage=".$e->getMessage());
		}
		return $zresults;
	}
}

	function wtwuploads() {
		return wtwuploads::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwuploads'] = wtwuploads();
?>
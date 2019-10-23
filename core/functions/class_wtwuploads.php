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
	
	public function copyFile($zfile1, $zfilepath1, $zfile2, $zfilepath2, $zcommunityid, $zbuildingid, $zthingid) {
		global $wtwiframes;
		$serror = "";
		try {
			$zfilepath = $wtwiframes->contentpath."\\uploads";
			if (!file_exists($zfilepath)) {
				mkdir($zfilepath, 0777);
			}
			if (!empty($zbuildingid)) {
				$zfilepath = $wtwiframes->contentpath."\\uploads\\buildings";
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
				$zfilepath = $wtwiframes->contentpath."\\uploads\\buildings\\".$zbuildingid;
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
				$zfilepath = $wtwiframes->contentpath."\\uploads\\buildings\\".$zbuildingid."\\media";
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
			} else if (!empty($zthingid)) {
				$zfilepath = $wtwiframes->contentpath."\\uploads\\things";
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
				$zfilepath = $wtwiframes->contentpath."\\uploads\\things\\".$zthingid;
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
				$zfilepath = $wtwiframes->contentpath."\\uploads\\things\\".$zthingid."\\media";
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
			} else if (!empty($zcommunityid)) {
				$zfilepath = $wtwiframes->contentpath."\\uploads\\communities";
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
				$zfilepath = $wtwiframes->contentpath."\\uploads\\communities\\".$zcommunityid;
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
				$zfilepath = $wtwiframes->contentpath."\\uploads\\communities\\".$zcommunityid."\\media";
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, 0777);
				}
			}
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
			$wtwiframes->serror("core-functions-class_wtwuploads.php-copyFile=".$e->getMessage());
		}	
		return $serror;
	}

	public function deleteFile($zfile1, $zfilepath1, $zcommunityid, $zbuildingid) {
		global $wtwiframes;
		/* purposly not added yet */
	}
	
	public function getSetting($zsettingname) {
		global $wtwiframes;
		return $wtwiframes->getSetting($zsettingname);
	}

	public function getSettings($zsettingnames) {
		global $wtwiframes;
		return $wtwiframes->getSettings($zsettingnames);
	}

	public function saveSetting($zsettingname, $zsettingvalue) {
		global $wtwiframes;
		return $wtwiframes->saveSetting($zsettingname, $zsettingvalue);
	}
	
	public function saveSettings($zsettings) {
		global $wtwiframes;
		return $wtwiframes->saveSettings($zsettings);
	}

	public function updateFileInDb($zuploadid, $imageset, $originalid, $websizeid, $thumbnailid, $zfiletitle, $zfilename, $zfileextension, $zfilesize, $zfiletype, $zfiledata, $imagewidth, $imageheight, $zfilepath) {
		global $wtwiframes;
		$zresults = array();
		try {
			if (!empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
				if (empty($zuploadid) || !isset($zuploadid)) {
					$zuploadid = $wtwiframes->getRandomString(16,1);
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
				$wtwiframes->query("
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
						 '".$wtwiframes->userid."',
						 '".$zfiletitle."',
						 '".$zfilename."',
						 '".$zfileextension."',
						 ".$wtwiframes->checkNumber($zfilesize,1024).",
						 '".$zfiletype."',
						 '".$zfilepath."',
						 ".$zfiledata.",
						 ".$wtwiframes->checkNumber($imagewidth,512).",
						 ".$wtwiframes->checkNumber($imageheight,512).",
						 now(),
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');");
				if (!empty($websizeid) && isset($websizeid) && !empty($originalid) && isset($originalid)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."uploads
						set websizeid = '".$websizeid."'
						where originalid='".$originalid."'
							and websizeid = ''
							and not originalid = '';");
				}
				if (!empty($thumbnailid) && isset($thumbnailid) && !empty($originalid) && isset($originalid)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."uploads
						set thumbnailid = '".$thumbnailid."'
						where originalid='".$originalid."'
							and thumbnailid = ''
							and not originalid = '';");
				}
				$zresults = $wtwiframes->query("
					select *
					from ".wtw_tableprefix."uploads
					where uploadid='".$zuploadid."';");
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwuploads.php-updateFileInDb=".$e->getMessage());
		}	
		return $zresults;
	}
	
	public function saveImageFilePng($zfilepath1, $zfilename1, $zfiledata, $zthingid, $zbuildingid, $zcommunityid) {
		global $wtwiframes;
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
			if (!file_exists($wtwiframes->contentpath."\\uploads")) {
				mkdir($wtwiframes->contentpath."\\uploads", 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\things")) {
				mkdir($wtwiframes->contentpath."\\uploads\\things", 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\things\\".$zthingid) && !empty($zthingid)) {
				mkdir($wtwiframes->contentpath."\\uploads\\things\\".$zthingid, 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\things\\".$zthingid."\\snapshots") && !empty($zthingid)) {
				mkdir($wtwiframes->contentpath."\\uploads\\things\\".$zthingid."\\snapshots", 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\buildings")) {
				mkdir($wtwiframes->contentpath."\\uploads\\buildings", 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\buildings\\".$zbuildingid) && !empty($zbuildingid)) {
				mkdir($wtwiframes->contentpath."\\uploads\\buildings\\".$zbuildingid, 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\buildings\\".$zbuildingid."\\snapshots") && !empty($zbuildingid)) {
				mkdir($wtwiframes->contentpath."\\uploads\\buildings\\".$zbuildingid."\\snapshots", 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\communities")) {
				mkdir($wtwiframes->contentpath."\\uploads\\communities", 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\communities\\".$zcommunityid) && !empty($zcommunityid)) {
				mkdir($wtwiframes->contentpath."\\uploads\\communities\\".$zcommunityid, 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\communities\\".$zcommunityid."\\snapshots") && !empty($zcommunityid)) {
				mkdir($wtwiframes->contentpath."\\uploads\\communities\\".$zcommunityid."\\snapshots", 0777);
			}
			if (!empty($zbuildingid)) {
				$zfilepath1 = $wtwiframes->contentpath."\\uploads\\buildings\\".$zbuildingid."\\snapshots\\";
				$browsepath = $wtwiframes->contenturl."/uploads/buildings/".$zbuildingid."/snapshots/".$zfilename1;
				$previewpath = $wtwiframes->contentpath."\\uploads\\buildings\\".$zbuildingid."-snapshot.png";
				$previewbrowsepath = $wtwiframes->contenturl."/uploads/buildings/".$zbuildingid."-snapshot.png";
				$previewfilename = $zbuildingid."-snapshot.png";
			} else if (!empty($zcommunityid)) {
				$zfilepath1 = $wtwiframes->contentpath."\\uploads\\communities\\".$zcommunityid."\\snapshots\\";
				$browsepath = $wtwiframes->contenturl."/uploads/communities/".$zcommunityid."/snapshots/".$zfilename1;
				$previewpath = $wtwiframes->contentpath."\\uploads\\communities\\".$zcommunityid."-snapshot.png";
				$previewbrowsepath = $wtwiframes->contenturl."/uploads/communities/".$zcommunityid."-snapshot.png";
				$previewfilename = $zcommunityid."-snapshot.png";
			} else if (!empty($zthingid)) {
				$zfilepath1 = $wtwiframes->contentpath."\\uploads\\things\\".$zthingid."\\snapshots\\";
				$browsepath = $wtwiframes->contenturl."/uploads/things/".$zthingid."/snapshots/".$zfilename1;
				$previewpath = $wtwiframes->contentpath."\\uploads\\things\\".$zthingid."-snapshot.png";
				$previewbrowsepath = $wtwiframes->contenturl."/uploads/things/".$zthingid."-snapshot.png";
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
			$originalid = $wtwiframes->getRandomString(16,2);
			$websizeid = $wtwiframes->getRandomString(16,2);
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
				$wtwiframes->query("
					update ".wtw_tableprefix."things
					set  snapshotid='".$zsnapshotid."',
						 updatedate=now(),
						 updateuserid='".$wtwiframes->userid."'
					where thingid='".$zthingid."';");
			} else if (!empty($zbuildingid) && isset($zbuildingid)) {
				$wtwiframes->query("
					update ".wtw_tableprefix."buildings
					set  snapshotid='".$zsnapshotid."',
						 updatedate=now(),
						 updateuserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid."';");
			} else if (!empty($zcommunityid) && isset($zcommunityid)) {
				$wtwiframes->query("
					update ".wtw_tableprefix."communities
					set  snapshotid='".$zsnapshotid."',
						 updatedate=now(),
						 updateuserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."';");
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwuploads.php-saveImageFilePng=".$e->getMessage());
		}	
		return array(
			'snapshotid' => $zsnapshotid,
			'snapshotpath' => $zsnapshotpath,
			'snapshotdata' => $zsnapshotdata);
	}
	
	public function resizeImage($originalFile, $ztargetfile, $newWidth) {
		global $wtwiframes;
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
			$wtwiframes->serror("core-functions-class_wtwuploads.php-resizeImage=".$e->getMessage());
		}
	}
	
	public function uploadFileToDb($zfilepath, $zfiletitle, $zfilename, $zfileextension, $zfiletype, $public) {
		global $wtwiframes;
		try {
			$zuploadid = "";
			$zuploadpath = "";
			$browsepath = "";
			$zwidth = null;
			$zheight = null;
			if ($public == '1') {
				$zuploadpath = $wtwiframes->contentpath;
				if (!file_exists($zuploadpath."\\uploads")) {
					mkdir($zuploadpath."\\uploads", 0777);
				}
				if(isset($_SESSION['wtw_uploadpathid']) && !empty($_SESSION['wtw_uploadpathid'])) {
					$syear = date('Y');
					$smonth = date('m');
					if (!file_exists($zuploadpath."\\uploads\\users")) {
						mkdir($zuploadpath."\\uploads\\users", 0777);
					}
					if (!file_exists($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid'])) {
						mkdir($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid'], 0777);
					}
					if (!file_exists($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\".$syear)) {
						mkdir($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\".$syear, 0777);
					}
					if (!file_exists($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\".$syear."\\".$smonth)) {
						mkdir($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\".$syear."\\".$smonth, 0777);
					}
					$zuploadpath = $zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\".$syear."\\".$smonth."\\";
					$browsepath = $wtwiframes->contenturl."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$syear."/".$smonth."/";
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
			$wtwiframes->serror("core-functions-class_wtwuploads.php-uploadFileToDb=".$e->getMessage());
		}
	}
	
	public function avoidDuplicateFileNames($zuploadpath, $zfilename) {
		global $wtwiframes;
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
			$wtwiframes->serror("core-functions-class_wtwuploads.php-avoidDuplicateFileNames=".$e->getMessage());
		}
		return $zfilename;
	}
	
	public function getNewFileName($zfilename, $newwidth, $newheight) {
		global $wtwiframes;
		try {
			$path_parts = pathinfo($zfilename);
			$ext = $path_parts['extension'];
			$zfile = $path_parts['filename'];
			$zfilename = $zfile."-".ceil($newwidth)."x".ceil($newheight).".".$ext;
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwuploads.php-getNewFileName=".$e->getMessage());
		}
		return $zfilename;
	}
	
	public function uploadObjectFileToDb($zfilepath, $zfilename, $zfileextension, $zfiletype) {
		global $wtwiframes;
		try {
			$zuploadid = "";
			$zuploadpath = "";
			$browsepath = "";
			$zobjectfolder = "";
			$zuploadpath = $wtwiframes->contentpath;
			if (!file_exists($zuploadpath."\\uploads")) {
				mkdir($zuploadpath."\\uploads", 0777);
			}
			if(isset($_SESSION['wtw_uploadpathid']) && !empty($_SESSION['wtw_uploadpathid'])) {
				$pathname = pathinfo('/'.$zfilename);
				$newfolder = $pathname['filename'];
				if (!file_exists($zuploadpath."\\uploads\\users")) {
					mkdir($zuploadpath."\\uploads\\users", 0777);
				}
				if (!file_exists($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid'])) {
					mkdir($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid'], 0777);
				}
				if (!file_exists($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\objects")) {
					mkdir($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\objects", 0777);
				}
				if (!file_exists($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\objects\\".$newfolder)) {
					mkdir($zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\objects\\".$newfolder, 0777);
				}
				$zuploadpath = $zuploadpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\objects\\".$newfolder."\\";
				$browsepath = $wtwiframes->contenturl."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder."/";
				$zobjectfolder = "/content/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder."/";
			}
			$zfilesize = filesize($zfilepath);
			if (!isset($zfilesize) && empty($zfilesize)) {
				$zfilesize = "null";
			}
			if (!empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
				$zfilename = $this->avoidDuplicateFileNames($zuploadpath, $zfilename);
				copy($zfilepath, $zuploadpath.$zfilename);
				$zuploadobjectid = $wtwiframes->getRandomString(16,1);
				$wtwiframes->query("
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
						 '".$wtwiframes->userid."',
						 '".$zobjectfolder."',
						 '".$zfilename."',
						 now(),
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');");
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwuploads.php-uploadObjectFileToDb=".$e->getMessage());
		}
	}
	
	public function setUploadVisibility($zthumbnailid, $zhide) {
		global $wtwiframes;
		try {
			if (!empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
				if ($zhide == 1 || $zhide == "1") {
					$wtwiframes->query("
						update ".wtw_tableprefix."uploads
						set hide=1,
							hidedate=now(),
							hideuserid='".$wtwiframes->userid."'
						where ((thumbnailid='".$zthumbnailid."') 
							or uploadid='".$zthumbnailid."')
							and not thumbnailid=''
							and userid='".$wtwiframes->userid."';");
				} else {
					$wtwiframes->query("
						update ".wtw_tableprefix."uploads
						set hide=0,
							hidedate=NULL,
							hideuserid=''
						where ((thumbnailid='".$zthumbnailid."') 
							or uploadid='".$zthumbnailid."')
							and not thumbnailid=''
							and userid='".$wtwiframes->userid."';");
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwuploads.php-setUploadVisibility=".$e->getMessage());
		}
	}

	public function importWebImages($zmoldgroup, $zwebid, $zcopywebid, $zwebimagesbulk) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwiframes->getSessionUserID())) {
				if (!empty($zwebimagesbulk)) {
					$zwebimagesbulk = base64_decode($zwebimagesbulk);
					$zwebimages = json_decode($zwebimagesbulk);
					$zrecordeach = 50 / count($zwebimages);
					$i = 50;
					foreach ($zwebimages as $zrow) {
						$zwebimageid = $wtwiframes->getRandomString(16,1);
						$wtwiframes->query("
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
								 ".$wtwiframes->checkNumber($zrow->imageindex,0).", 
								 '".$zrow->imageid."', 
								 '".$zrow->imagehoverid."', 
								 '".$zrow->imageclickid."', 
								 ".$wtwiframes->checkNumber($zrow->graphiclevel,0).", 
								 '".$zrow->jsfunction."', 
								 '".$zrow->jsparameters."', 
								 '".$wtwiframes->userid."', 
								 '".$zrow->alttag."', 
								 now(),
								 '".$wtwiframes->userid."',
								 now(),
								 '".$wtwiframes->userid."');");
						$i += $zrecordeach;
						echo "<script>parent.WTW.updateProgressBar(".$i.",100);</script>";
					}
					/* update foreign keys to new webimageids (updating moldids) */
					$wtwiframes->query("
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
			$wtwiframes->serror("core-functions-class_wtwuploads.php-importWebImages=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function importUploads($zmoldgroup, $zwebid, $zcopywebid, $zuploadsbulk) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwiframes->getSessionUserID())) {
				if (!empty($zuploadsbulk)) {
					$zuploadsbulk = base64_decode($zuploadsbulk);
					$zuploads = json_decode($zuploadsbulk);
					$this->checkUploadFolders($zmoldgroup, $zwebid);
					$zrecordeach = 20 / count($zuploads);
					$i = 80;
					foreach ($zuploads as $zrow) {
						$zuploadid = $wtwiframes->getRandomString(16,1);
						$zfiledata = null;
						if (isset($zrow->filedata) && !empty($zrow->filedata)) {
							$zfiledata = addslashes(base64_decode($zrow->filedata));
						}
						if(isset($zfiledata) && !empty($zfiledata)) {
							$fileresults = $this->writeDataToFile($zrow->filedata, $zmoldgroup, $zwebid, $zrow->filename);
							$filename = $fileresults["filename"];
							$filepath = $fileresults["filepath"];
							$wtwiframes->query("
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
									 ".$wtwiframes->checkNumber($zrow->filesize,0).", 
									 '".$zrow->filetype."', 
									 '".$filepath."', 
									 '".$zfiledata."', 
									 ".$wtwiframes->checkNumber($zrow->imagewidth,1).", 
									 ".$wtwiframes->checkNumber($zrow->imageheight,1).", 
									 0, 
									 '".$zrow->userid."', 
									 now(),
									 '".$wtwiframes->userid."',
									 now(),
									 '".$wtwiframes->userid."');");
						} else {
							$fileresults = $this->writeFileFromPath($zrow->filepath, $zmoldgroup, $zwebid, $zrow->filename);
							$filename = $fileresults["filename"];
							$filepath = $fileresults["filepath"];
							$wtwiframes->query("
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
									 ".$wtwiframes->checkNumber($zrow->filesize,0).", 
									 '".$zrow->filetype."', 
									 '".$filepath."', 
									 ".$wtwiframes->checkNumber($zrow->imagewidth,1).", 
									 ".$wtwiframes->checkNumber($zrow->imageheight,1).", 
									 ".$wtwiframes->checkNumber($zrow->stock,0).", 
									 '".$zrow->userid."', 
									 now(),
									 '".$wtwiframes->userid."',
									 now(),
									 '".$wtwiframes->userid."');");
						}
						$wtwiframes->query("
							update ".wtw_tableprefix."uploads
							set originalid='".$zuploadid."'
							where originalid='".$zrow->uploadid."';");
						$wtwiframes->query("
							update ".wtw_tableprefix."uploads
							set websizeid='".$zuploadid."'
							where websizeid='".$zrow->uploadid."';");
						$wtwiframes->query("
							update ".wtw_tableprefix."uploads
							set thumbnailid='".$zuploadid."'
							where thumbnailid='".$zrow->uploadid."';"); 
						$i += $zrecordeach;
						echo "<script>parent.WTW.updateProgressBar(".$i.",100);</script>";
					}
					/* update foreign keys to new uploadids */
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.textureid=t2.pastuploadid
						set t1.textureid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.textureid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumpid=t2.pastuploadid
						set t1.texturebumpid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebumpid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturehoverid=t2.pastuploadid
						set t1.texturehoverid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturehoverid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.videoid=t2.pastuploadid
						set t1.videoid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.videoid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.videoposterid=t2.pastuploadid
						set t1.videoposterid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.videoposterid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.heightmapid=t2.pastuploadid
						set t1.heightmapid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.heightmapid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.mixmapid=t2.pastuploadid
						set t1.mixmapid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.mixmapid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturerid=t2.pastuploadid
						set t1.texturerid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturerid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturegid=t2.pastuploadid
						set t1.texturegid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturegid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebid=t2.pastuploadid
						set t1.texturebid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumprid=t2.pastuploadid
						set t1.texturebumprid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebumprid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumpgid=t2.pastuploadid
						set t1.texturebumpgid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebumpgid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumpbid=t2.pastuploadid
						set t1.texturebumpbid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.texturebumpbid='')
							and (not t2.uploadid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.soundid=t2.pastuploadid
						set t1.soundid=t2.uploadid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.".$zmoldgroup."id='')
							and (not t1.soundid='')
							and (not t2.uploadid is null);");

					$wtwiframes->query("
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
					$wtwiframes->query("
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
					$wtwiframes->query("
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
			$wtwiframes->serror("core-functions-class_wtwuploads.php-importUploads=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function writeDataToFile($zbase64data, $zmoldgroup, $zwebid, $zfilename) {
		global $wtwiframes;
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
			$zfilepath = $wtwiframes->contentpath."\\uploads\\".$zmoldgrouppath."\\".$zwebid."\\";
			$zbrowsepath = $wtwiframes->contenturl."/uploads/".$zmoldgrouppath."/".$zwebid."/";
			$znewfilename = $this->avoidDuplicateFileNames($zfilepath, $zfilename);
			$zdata1 = base64_decode($zbase64data);
			$znewfilepath = $zbrowsepath.$znewfilename;
			$zsuccess = file_put_contents($zfilepath.$znewfilename, $zdata1);		
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwuploads.php-writeDataToFile=".$e->getMessage());
		}
		return array(
			'filename' => $znewfilename,
			'filepath' => $znewfilepath);
	}
	
	public function writeFileFromPath($zfromurl, $zmoldgroup, $zwebid, $zfilename) {
		global $wtwiframes;
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
				$zfilepath = $wtwiframes->contentpath."\\uploads\\".$zmoldgrouppath."\\".$zwebid."\\";
				$zbrowsepath = $wtwiframes->contenturl."/uploads/".$zmoldgrouppath."/".$zwebid."/";
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
			$wtwiframes->serror("core-functions-class_wtwuploads.php-writeFileFromPath=".$e->getMessage());
		}
		return array(
			'filename' => $znewfilename,
			'filepath' => $znewfilepath);
	}
	
	
	public function checkUploadFolders($zmoldgroup, $zwebid) {
		global $wtwiframes;
		$zsuccess = false;
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
			if (!file_exists($wtwiframes->contentpath."\\uploads")) {
				mkdir($wtwiframes->contentpath."\\uploads", 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\".$zmoldgrouppath)) {
				mkdir($wtwiframes->contentpath."\\uploads\\".$zmoldgrouppath, 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\".$zmoldgrouppath."\\".$zwebid)) {
				mkdir($wtwiframes->contentpath."\\uploads\\".$zmoldgrouppath."\\".$zwebid, 0777);
			}
			if (!file_exists($wtwiframes->contentpath."\\uploads\\".$zmoldgrouppath."\\".$zwebid."\\snapshots")) {
				mkdir($wtwiframes->contentpath."\\uploads\\".$zmoldgrouppath."\\".$zwebid."\\snapshots", 0777);
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwuploads.php-checkUploadFolders=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function setKeyHash($zkey, $zmoldgroup, $zwebid) {
		global $wtwiframes;
		try {
			if (!empty($zkey) && isset($zkey)) {
				$zkey = base64_decode($zkey);
				$options = ['cost' => 11];
				$zkeyhash = password_hash($zkey, PASSWORD_DEFAULT, $options);
				switch ($zmoldgroup) {
					case "community":
						$wtwiframes->query("
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
			$wtwiframes->serror("core-functions-class_wtwuploads.php-getKeyHash=".$e->getMessage());
		}
		return $zkey;
	}

	public function saveWebAlias($zwebaliasid,$zforcehttps,$zdomainname,$zcommunitypublishname,$zbuildingpublishname,$zthingpublishname,$zcommunityid,$zbuildingid,$zthingid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->isUserInRole("Admin")) {
				/* check to see if web alias is already in use - if so - update it */
				$zresponse = $wtwiframes->query("
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
					$zresponse = $wtwiframes->query("
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
					$zwebaliasid = $wtwiframes->getRandomString(16,1);
					$wtwiframes->query("
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
							'".$wtwiframes->userid."',
							now(),
							'".$wtwiframes->userid."');");
				} else {
					$wtwiframes->query("
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
							updateuserid='".$wtwiframes->userid."',
							deleteddate=null,
							deleteduserid='',
							deleted=0
						where webaliasid='".$zwebaliasid."'
						limit 1;");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwuploads.php-saveWebAlias=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function deleteWebAlias($zwebaliasid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->isUserInRole("Admin")) {
				/* update or insert new webalias */
				if (!empty($zwebaliasid) && isset($zwebaliasid)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."webaliases
						set deleteddate=now(),
							deleteduserid='".$wtwiframes->userid."',
							deleted=1
						where webaliasid='".$zwebaliasid."'
						limit 1;");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwuploads.php-deleteWebAlias=".$e->getMessage());
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
			$wtwiframes->serror("core-functions-class_wtwuploads.php-hasTransparency=".$e->getMessage());
		}
		return $zhastransparency;
	}
}

	function wtwuploads() {
		return wtwuploads::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwuploads'] = wtwuploads();
?>
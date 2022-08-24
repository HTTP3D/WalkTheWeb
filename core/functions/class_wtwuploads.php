<?php
class wtwuploads {
	/* $wtwuploads class for WalkTheWeb functions for uploading and retrieving files */
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
		/* copies a file from one location to another - used after upload to place the temp file to the correct final location */
		global $wtwhandlers;
		$serror = "";
		try {
			$wtwhandlers->checkContentFolders($zcommunityid, $zbuildingid, $zthingid, '');
			if (!file_exists($zfilepath1.$zfile1)) {
				$serror = "Source File not Found. ".$zfilepath1.$zfile1;
			}
			if (!file_exists($zfilepath2)) {
				mkdir($zfilepath2, octdec(wtw_chmod), true);
				chmod($zfilepath2, octdec(wtw_chmod));
			}
			if (file_exists($zfilepath2.$zfile2)) {
				$serror = "Destination File Already Exists. ".$zfilepath2.$zfile2;
			}
			if ($serror == "") {
				copy($zfilepath1.$zfile1, $zfilepath2.$zfile2);
				chmod($zfilepath2.$zfile2, octdec(wtw_chmod));
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-copyFile=".$e->getMessage());
		}	
		return $serror;
	}

	public function deleteFile($zfile1, $zfilepath1, $zcommunityid, $zbuildingid) {
		global $wtwhandlers;
		/* purposly not added yet - admins will have to delete files directly as needed */
	}
	
	/* expose functions to this class from other functions so that the original function is only updated in one place */
	public function getSetting($zsettingname, $zdefaultvalue) {
		global $wtwhandlers;
		return $wtwhandlers->getSetting($zsettingname, $zdefaultvalue);
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

	public function updateFileInDb($zuploadid, $zimageset, $zoriginalid, $zwebsizeid, $zthumbnailid, $zfiletitle, $zfilename, $zfileextension, $zfilesize, $zfiletype, $zfiledata, $zimagewidth, $zimageheight, $zfilepath) {
		/* if file is stored in the database or file system, this updates the relative information in the database */
		global $wtwhandlers;
		try {
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
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
						 '".$zoriginalid."',
						 '".$zwebsizeid."',
						 '".$zthumbnailid."',
						 '".$wtwhandlers->userid."',
						 '".$zfiletitle."',
						 '".$zfilename."',
						 '".$zfileextension."',
						 ".$wtwhandlers->checkNumber($zfilesize,1024).",
						 '".$zfiletype."',
						 '".$zfilepath."',
						 ".$zfiledata.",
						 ".$wtwhandlers->checkNumber($zimagewidth,512).",
						 ".$wtwhandlers->checkNumber($zimageheight,512).",
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-updateFileInDb=".$e->getMessage());
		}	
	}
	
	public function saveImageFilePng($zfilepath1, $zfilename1, $zfiledata, $zcommunityid, $zbuildingid, $zthingid, $zavatarid) {
		/* saves image files (mostly screen shots), resizes, and updates settings in the database */
		global $wtwhandlers;
		$zsnapshotid = "";
		$zsnapshotpath = "";
		$zsnapshotdata = null;
		try {
			$zpreviewpath = "";
			$zpreviewfilename = "";
			$zpreviewbrowsepath = "";
			$zuserid = "";
			$zuploadpathid = "";
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
			}
			if(isset($_SESSION["wtw_uploadpathid"]) && !empty($_SESSION["wtw_uploadpathid"])) {
				$zuploadpathid = $_SESSION["wtw_uploadpathid"];
			}
			$wtwhandlers->checkContentFolders($zcommunityid, $zbuildingid, $zthingid, $zavatarid);
			
			if (!empty($zbuildingid)) {
				$zfilepath1 = $wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid."/snapshots/";
				$zsnapshotpath = $wtwhandlers->contenturl."/uploads/buildings/".$zbuildingid."/snapshots/".$zfilename1;
				$zpreviewpath = $wtwhandlers->contentpath."/uploads/buildings/".$zbuildingid."-snapshot.png";
				$zpreviewbrowsepath = $wtwhandlers->contenturl."/uploads/buildings/".$zbuildingid."-snapshot.png";
				$zpreviewfilename = $zbuildingid."-snapshot.png";
			} else if (!empty($zcommunityid)) {
				$zfilepath1 = $wtwhandlers->contentpath."/uploads/communities/".$zcommunityid."/snapshots/";
				$zsnapshotpath = $wtwhandlers->contenturl."/uploads/communities/".$zcommunityid."/snapshots/".$zfilename1;
				$zpreviewpath = $wtwhandlers->contentpath."/uploads/communities/".$zcommunityid."-snapshot.png";
				$zpreviewbrowsepath = $wtwhandlers->contenturl."/uploads/communities/".$zcommunityid."-snapshot.png";
				$zpreviewfilename = $zcommunityid."-snapshot.png";
			} else if (!empty($zthingid)) {
				$zfilepath1 = $wtwhandlers->contentpath."/uploads/things/".$zthingid."/snapshots/";
				$zsnapshotpath = $wtwhandlers->contenturl."/uploads/things/".$zthingid."/snapshots/".$zfilename1;
				$zpreviewpath = $wtwhandlers->contentpath."/uploads/things/".$zthingid."-snapshot.png";
				$zpreviewbrowsepath = $wtwhandlers->contenturl."/uploads/things/".$zthingid."-snapshot.png";
				$zpreviewfilename = $zthingid."-snapshot.png";
			} else if (!empty($zavatarid)) {
				$zfilepath1 = $wtwhandlers->contentpath."/uploads/avatars/".$zavatarid."/snapshots/";
				$zsnapshotpath = $wtwhandlers->contenturl."/uploads/avatars/".$zavatarid."/snapshots/".$zfilename1;
				$zpreviewpath = $wtwhandlers->contentpath."/uploads/avatars/".$zavatarid."/snapshots/".$zavatarid."-snapshot.png";
				$zpreviewbrowsepath = $wtwhandlers->contenturl."/uploads/avatars/".$zavatarid."/snapshots/".$zavatarid."-snapshot.png";
				$zpreviewfilename = $zavatarid."-snapshot.png";
			} else {
				$zsnapshotpath = $wtwhandlers->contenturl."/uploads/feedback/snapshots/".$zfilename1;
				$zpreviewpath = $wtwhandlers->contentpath."/uploads/feedback/snapshots/".$zfilename1;
				$zpreviewbrowsepath = $wtwhandlers->contenturl."/uploads/feedback/snapshots/".$zfilename1;
				$zpreviewfilename = $zfilename1;
			}
			$zfiledata = str_replace('data:image/png;base64,', '', $zfiledata);
			$zfiledata = str_replace(' ', '+', $zfiledata);
			$zdata1 = $wtwhandlers->decode64($zfiledata);
			$zfile1 = $zfilepath1.$zfilename1;
			$zsuccess = file_put_contents($zfile1, $zdata1);
			chmod($zfile1, octdec(wtw_chmod));
			$zfilepath = "";
			$zfiletitle = "";
			if ($zfilename1 == "defaultbuilding.png") {
				$zfiletitle = "defaultbuildingsm.png";
			} else if ($zfilename1 == "defaultcommunity.png") {				
				$zfiletitle = "defaultcommunitysm.png";
			} else if ($zfilename1 == "defaultthing.png") {				
				$zfiletitle = "defaultthingsm.png";
			} else if ($zfilename1 == "defaultavatar.png") {				
				$zfiletitle = "defaultavatarsm.png";
			} else {
				$zfiletitle = str_replace('.png', 'sm.png', $zfilename1);;
			}
			$zfilepath = $zfilepath1.$zfiletitle;
			$zoriginalid = $wtwhandlers->getRandomString(16,1);
			$zsnapshotid = $wtwhandlers->getRandomString(16,1);
			$this->resizeImage($zfile1, $zpreviewpath, 512);
			$zpreviewimagedetails = getimagesize($zpreviewpath);
			$zpreviewwidth = $zpreviewimagedetails[0];
			$zpreviewheight = $zpreviewimagedetails[1];
			$zpreviewfilesize = filesize($zpreviewpath);

			$this->updateFileInDb($zoriginalid,'original',$zoriginalid,$zsnapshotid,'',$zpreviewfilename,$zpreviewfilename,'png',$zpreviewfilesize,'image/png',null,$zpreviewwidth,$zpreviewheight,$zpreviewbrowsepath);

			$this->resizeImage($zfile1, $zfilepath, 300);
			$zimagedetails = getimagesize($zfilepath);
			$zwidth = $zimagedetails[0];
			$zheight = $zimagedetails[1];
			$zfilesize = filesize($zfilepath);
			$zfiledata = addslashes($wtwhandlers->openFilefromURL($zfilepath));
			
			$this->updateFileInDb($zsnapshotid,'websize',$zoriginalid,$zsnapshotid,'',$zfiletitle,$zfiletitle,'png',$zfilesize,'image/png',$zfiledata,$zwidth,$zheight,$zsnapshotpath);
			
			$zsnapshotdata = "data:image/png;base64,".addslashes(base64_encode($zfiledata));
			
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
			} else if (!empty($zavatarid) && isset($zavatarid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."avatars
					set  snapshotid='".$zsnapshotid."',
						 updatedate=now(),
						 updateuserid='".$wtwhandlers->userid."'
					where avatarid='".$zavatarid."';");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-saveImageFilePng=".$e->getMessage());
		}	
		return array(
			'snapshotid' => $zsnapshotid,
			'snapshotpath' => $zsnapshotpath,
			'snapshotdata' => $zsnapshotdata);
	}
	
	public function resizeImage($zoriginalfile, $ztargetfile, $znewwidth) {
		/* resize image function */
		global $wtwhandlers;
		try {
			$zinfo = getimagesize($zoriginalfile);
			$zmime = $zinfo['mime'];
			$zimagefunc = null;
			$zimagesavefunc = null;
			switch ($zmime) {
				case 'image/jpeg':
						$zimagefunc = 'imagecreatefromjpeg';
						$zimagesavefunc = 'imagejpeg';
						$zimageext = 'jpg';
						break;
				case 'image/png':
						$zimagefunc = 'imagecreatefrompng';
						$zimagesavefunc = 'imagepng';
						$zimageext = 'png';
						break;
				case 'image/gif':
						$zimagefunc = 'imagecreatefromgif';
						$zimagesavefunc = 'imagegif';
						$zimageext = 'gif';
						break;
				default: 
						$zimagefunc = 'imagecreatefrompng';
						$zimagesavefunc = 'imagepng';
						$zimageext = 'png';
						break;
			}
			$zissnapshot = strpos($zoriginalfile, 'snapshot');
			$zimage = $zimagefunc($zoriginalfile);
			list($zwidth, $zheight) = getimagesize($zoriginalfile);
			$znewheight = ($zheight / $zwidth) * $znewwidth;
			$ztemp = imagecreatetruecolor($znewwidth, $znewheight);
			if (($zmime == "image/png" || $zmime == "image/gif") && $zissnapshot === false) {
				imagecolortransparent($ztemp, imagecolorallocate($ztemp, 0, 0, 0));
				//imagealphablending( $zfilepath, false );
				//imagesavealpha( $zfilepath, true );
			}
			imagecopyresampled($ztemp, $zimage, 0, 0, 0, 0, $znewwidth, $znewheight, $zwidth, $zheight);
			if (file_exists($ztargetfile)) {
				unlink($ztargetfile);
			}
			$zimagesavefunc($ztemp, $ztargetfile);
			chmod($ztargetfile, octdec(wtw_chmod));
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-resizeImage=".$e->getMessage());
		}
	}
	
	public function uploadFileToDb($zfilepath, $zfiletitle, $zfilename, $zfileextension, $zfiletype, $zpublic) {
		/* function to upload a file to the database - if file is to be stored in the database */
		global $wtwhandlers;
		try {
			$zoriginalid = $wtwhandlers->getRandomString(16,1);
			$zwebsizeid = $wtwhandlers->getRandomString(16,1);
			$zthumbnailid = $wtwhandlers->getRandomString(16,1);
			$zuploadpath = "";
			$zbrowsepath = "";
			$zwidth = null;
			$zheight = null;
			if ($zpublic == '1') {
				$wtwhandlers->checkContentFolders('', '', '', '');
				$zuploadpath = $wtwhandlers->contentpath;
				if(isset($_SESSION['wtw_uploadpathid']) && !empty($_SESSION['wtw_uploadpathid'])) {
					$zyear = date('Y');
					$zmonth = date('m');
					$zuploadpath = $zuploadpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$zyear."/".$zmonth."/";
					$zbrowsepath = $wtwhandlers->contenturl."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$zyear."/".$zmonth."/";
				} else {
					$zpublic = '0';
				}
			}
			$zfiledata = null;
			if (strpos($zfiletype, 'image') > -1) {
				$zfiledata = addslashes($wtwhandlers->openFilefromURL($zfilepath));
			}
			$zissnapshot = strpos($zfilepath, 'snapshot');
			if (empty($zfiletitle)) {
				$zfiletitle = $zfilename;
			}
			if (strpos($zfiletype, 'image') > -1) {
				$zimagedetails = getimagesize($zfilepath);
				$zwidth = $zimagedetails[0];
				$zheight = $zimagedetails[1];
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
			if ($zpublic == '1') {
				$zfilename = $this->avoidDuplicateFileNames($zuploadpath, $zfilename);
				copy($zfilepath, $zuploadpath.$zfilename);
			}
			if (strpos($zfiletype, 'image') > -1) {
				if(isset($zfiledata) && !empty($zfiledata)) {
					$this->updateFileInDb($zoriginalid,'original',$zoriginalid,$zwebsizeid,$zthumbnailid,$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,$zfiledata,$zwidth,$zheight,$zbrowsepath.$zfilename);
				} else {
					$this->updateFileInDb($zoriginalid,'original',$zoriginalid,$zwebsizeid,$zthumbnailid,$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,null,$zwidth,$zheight,$zbrowsepath.$zfilename);
				}
				$zimagefunc = null;
				$zimagesavefunc = null;
				switch ($zfiletype) {
					case 'image/jpeg':
							$zimagefunc = 'imagecreatefromjpeg';
							$zimagesavefunc = 'imagejpeg';
							$zimageext = 'jpg';
							break;
					case 'image/png':
							$zimagefunc = 'imagecreatefrompng';
							$zimagesavefunc = 'imagepng';
							$zimageext = 'png';
							break;
					case 'image/gif':
							$zimagefunc = 'imagecreatefromgif';
							$zimagesavefunc = 'imagegif';
							$zimageext = 'gif';
							break;
					default: 
							$zimagefunc = 'imagecreatefrompng';
							$zimagesavefunc = 'imagepng';
							$zimageext = 'png';
							break;
				}
				$zimage = $zimagefunc($zfilepath);
				$zmaxwidth = 512;
				$zmaxheight = 512;
				$zscale = min($zmaxwidth/$zwidth, $zmaxheight/$zheight);
				$znewwidth = ceil($zscale * $zwidth);
				$znewheight = ceil($zscale * $zheight);
				$znewimage = imagecreatetruecolor($znewwidth, $znewheight);
				if (($zfileextension == "png" || $zfileextension == "gif") && $zissnapshot === false) {
					imagecolortransparent($znewimage, imagecolorallocate($znewimage, 0, 0, 0));
					//imagealphablending( $zfilepath, false );
					//imagesavealpha( $zfilepath, true );
				}
				imagecopyresampled($znewimage, $zimage, 0, 0, 0, 0, $znewwidth, $znewheight, $zwidth, $zheight);
				if (file_exists($zfilepath)) {
					unlink($zfilepath);
				}
				$zimagesavefunc($znewimage, $zfilepath);
				chmod($zfilepath, octdec(wtw_chmod));
				$zfilesize = filesize($zfilepath);
				$zfiledata = addslashes($wtwhandlers->openFilefromURL($zfilepath));
				$znewfilename = "";
				if ($zpublic == '1') {
					$znewfilename = $this->getNewFileName($zfilename, $znewwidth, $znewheight);
					copy($zfilepath, $zuploadpath.$znewfilename);
				}
				$this->updateFileInDb($zwebsizeid,'websize',$zoriginalid,$zwebsizeid,$zthumbnailid,$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,$zfiledata,$znewwidth,$znewheight,$zbrowsepath.$znewfilename);
				$zmaxwidth = 80;
				$zmaxheight = 80;
				$zscale = min($zmaxwidth/$zwidth, $zmaxheight/$zheight);
				$znewwidth = ceil($zscale * $zwidth);
				$znewheight = ceil($zscale * $zheight);
				$znewimage = imagecreatetruecolor($znewwidth, $znewheight);
				if (($zfileextension == "png" || $zfileextension == "gif") && $zissnapshot === false) {
					imagecolortransparent($znewimage, imagecolorallocate($znewimage, 0, 0, 0));
					//imagealphablending( $zfilepath, false );
					//imagesavealpha( $zfilepath, true );
				}
				imagecopyresampled($znewimage, $zimage, 0, 0, 0, 0, $znewwidth, $znewheight, $zwidth, $zheight);
				if (file_exists($zfilepath)) {
					unlink($zfilepath);
				}
				$zimagesavefunc($znewimage, $zfilepath);
				chmod($zfilepath, octdec(wtw_chmod));
				$zfilesize = filesize($zfilepath);
				$zfiledata = addslashes($wtwhandlers->openFilefromURL($zfilepath));
				$znewfilename = "";
				if ($zpublic == '1') {
					$znewfilename = $this->getNewFileName($zfilename, $znewwidth, $znewheight);
					copy($zfilepath, $zuploadpath.$znewfilename);
				}
				$this->updateFileInDb($zthumbnailid,'thumbnail',$zoriginalid,$zwebsizeid,$zthumbnailid,$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,$zfiledata,$znewwidth,$znewheight,$zbrowsepath.$znewfilename);
				if (file_exists($zfilepath)) {
					unlink($zfilepath);
				}
			} else {
				if(isset($zfiledata) && !empty($zfiledata)) {
					$this->updateFileInDb($zoriginalid,'original',$zoriginalid,'','',$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,$zfiledata,$zwidth,$zheight,$zbrowsepath.$zfilename);
				} else {
					$this->updateFileInDb($zoriginalid,'original',$zoriginalid,'','',$zfiletitle,$zfilename,$zfileextension,$zfilesize,$zfiletype,null,$zwidth,$zheight,$zbrowsepath.$zfilename);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-uploadFileToDb=".$e->getMessage());
		}
	}
	
	public function avoidDuplicateFileNames($zuploadpath, $zfilename) {
		/* checks for duplicate file names and sets a new filename if a duplicate is found */
		global $wtwhandlers;
		try {
			if (file_exists($zuploadpath.$zfilename)) {
				$zpathparts = pathinfo($zfilename);
				$zext = $zpathparts['extension'];
				$zfile = $zpathparts['filename'];
				$x = 1;
				while (file_exists($zuploadpath.$zfilename)) {
					$zfilename = $zfile."-".$x.".".$zext;
					$x += 1;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-avoidDuplicateFileNames=".$e->getMessage());
		}
		return $zfilename;
	}
	
	public function getNewFileName($zfilename, $newwidth, $newheight) {
		/* get a new filename that does not exist yet */
		global $wtwhandlers;
		try {
			$zpathparts = pathinfo($zfilename);
			$zext = $zpathparts['extension'];
			$zfile = $zpathparts['filename'];
			$zfilename = $zfile."-".ceil($newwidth)."x".ceil($newheight).".".$zext;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getNewFileName=".$e->getMessage());
		}
		return $zfilename;
	}
	
	public function uploadObjectFileToDb($zfilepath, $zfilename, $zfileextension, $zfiletype) {
		/* create folder, upload 3D Object (media Library), and add settings to the database */
		global $wtwhandlers;
		try {
			$zuploadid = "";
			$zuploadpath = "";
			$zbrowsepath = "";
			$zobjectfolder = "";
			$wtwhandlers->checkContentFolders('', '', '', '');
			$zuploadpath = $wtwhandlers->contentpath;
			if(isset($_SESSION['wtw_uploadpathid']) && !empty($_SESSION['wtw_uploadpathid'])) {
				$pathname = pathinfo('/'.$zfilename);
				$newfolder = $pathname['filename'];
				if (!file_exists($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder)) {
					mkdir($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder, octdec(wtw_chmod), true);
					chmod($wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder, octdec(wtw_chmod));
				}
				$zuploadpath = $zuploadpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder."/";
				$zbrowsepath = $wtwhandlers->contenturl."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$newfolder."/";
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
		/* if it should show or hide the image in the Media Library images (like an archive function) */
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

	public function importWebImages($zwebtype, $zwebid, $zcopywebid, $zwebimagesbulk) {
		/* imports the textures and images to the local server when downloading a 3D Obect from the media Library */
		$zsuccess = false;
		global $wtwhandlers;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				if (!empty($zwebimagesbulk)) {
					$zwebimagesbulk = $wtwhandlers->decode64($zwebimagesbulk);
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
							inner join ".wtw_tableprefix.$zwebtype."molds t2
							on t1.".$zwebtype."moldid=t2.past".$zwebtype."moldid
						set t1.".$zwebtype."moldid=t2.".$zwebtype."moldid
						where t2.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."moldid='')
							and (not t2.".$zwebtype."moldid is null);");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-importWebImages=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function importUploads($zwebtype, $zwebid, $zcopywebid, $zuploadsbulk) {
		/* import the related uploads table entries for a downloaded 3D Object from Media Library */
		$zsuccess = false;
		global $wtwhandlers;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				if (!empty($zuploadsbulk)) {
					$zuploadsbulk = $wtwhandlers->decode64($zuploadsbulk);
					$zuploads = json_decode($zuploadsbulk);
					$zcommunityid = '';
					$zbuildingid = '';
					$zthingid = '';
					$zavatarid = '';
					switch ($zwebtype) {
						case "community":
							$zcommunityid = $zwebid;
							break;
						case "building":
							$zbuildingid = $zwebid;
							break;
						case "thing":
							$zthingid = $zwebid;
							break;
						case "avatar":
							$zavatarid = $zwebid;
							break;
					}
					$wtwhandlers->checkContentFolders($zcommunityid, $zbuildingid, $zthingid, $zavatarid);
					$zrecordeach = 20 / count($zuploads);
					$i = 80;
					foreach ($zuploads as $zrow) {
						$zuploadid = $wtwhandlers->getRandomString(16,1);
						$zfiledata = null;
						if (isset($zrow->filedata) && !empty($zrow->filedata)) {
							$zfiledata = addslashes($wtwhandlers->decode64($zrow->filedata));
						}
						if(isset($zfiledata) && !empty($zfiledata)) {
							$zfileresults = $this->writeDataToFile($zrow->filedata, $zwebtype, $zwebid, $zrow->filename);
							$zfilename = $zfileresults["filename"];
							$zfilepath = $zfileresults["filepath"];
							chmod($zfilepath, octdec(wtw_chmod));
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
									 '".$zfilename."', 
									 '".$zrow->fileextension."', 
									 ".$wtwhandlers->checkNumber($zrow->filesize,0).", 
									 '".$zrow->filetype."', 
									 '".$zfilepath."', 
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
							$zfileresults = $this->writeFileFromPath($zrow->filepath, $zwebtype, $zwebid, $zrow->filename);
							$zfilename = $zfileresults["filename"];
							$zfilepath = $zfileresults["filepath"];
							chmod($zfilepath, octdec(wtw_chmod));
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
									 '".$zfilename."', 
									 '".$zrow->fileextension."', 
									 ".$wtwhandlers->checkNumber($zrow->filesize,0).", 
									 '".$zrow->filetype."', 
									 '".$zfilepath."', 
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
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.textureid=t2.pastuploadid
						set t1.textureid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.textureid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumpid=t2.pastuploadid
						set t1.texturebumpid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.texturebumpid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturehoverid=t2.pastuploadid
						set t1.texturehoverid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.texturehoverid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.videoid=t2.pastuploadid
						set t1.videoid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.videoid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.videoposterid=t2.pastuploadid
						set t1.videoposterid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.videoposterid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.heightmapid=t2.pastuploadid
						set t1.heightmapid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.heightmapid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.mixmapid=t2.pastuploadid
						set t1.mixmapid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.mixmapid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturerid=t2.pastuploadid
						set t1.texturerid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.texturerid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturegid=t2.pastuploadid
						set t1.texturegid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.texturegid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebid=t2.pastuploadid
						set t1.texturebid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.texturebid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumprid=t2.pastuploadid
						set t1.texturebumprid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.texturebumprid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumpgid=t2.pastuploadid
						set t1.texturebumpgid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.texturebumpgid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.texturebumpbid=t2.pastuploadid
						set t1.texturebumpbid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.texturebumpbid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1
							inner join ".wtw_tableprefix."uploads t2
							on t1.soundid=t2.pastuploadid
						set t1.soundid=t2.uploadid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.".$zwebtype."id='')
							and (not t1.soundid='')
							and (not t2.uploadid is null);");

					$wtwhandlers->query("
						update ".wtw_tableprefix."webimages t1
							inner join ".wtw_tableprefix.$zwebtype."molds t3
								on t1.".$zwebtype."moldid=t3.".$zwebtype."moldid
							inner join ".wtw_tableprefix."uploads t2
								on t1.imageid=t2.pastuploadid
						set t1.imageid=t2.uploadid
						where t3.".$zwebtype."id='".$zwebid."'
							and (not t3.".$zwebtype."id='')
							and (not t1.imageid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix."webimages t1
							inner join ".wtw_tableprefix.$zwebtype."molds t3
								on t1.".$zwebtype."moldid=t3.".$zwebtype."moldid
							inner join ".wtw_tableprefix."uploads t2
								on t1.imagehoverid=t2.pastuploadid
						set t1.imagehoverid=t2.uploadid
						where t3.".$zwebtype."id='".$zwebid."'
							and (not t3.".$zwebtype."id='')
							and (not t1.imagehoverid='')
							and (not t2.uploadid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix."webimages t1
							inner join ".wtw_tableprefix.$zwebtype."molds t3
								on t1.".$zwebtype."moldid=t3.".$zwebtype."moldid
							inner join ".wtw_tableprefix."uploads t2
								on t1.imageclickid=t2.pastuploadid
						set t1.imageclickid=t2.uploadid
						where t3.".$zwebtype."id='".$zwebid."'
							and (not t3.".$zwebtype."id='')
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
	
	public function writeDataToFile($zbase64data, $zwebtype, $zwebid, $zfilename) {
		/* converts a database stored file to a physical file on the server */
		global $wtwhandlers;
		$znewfilename = "";
		$znewfilepath = "";
		try {
			$zwebtypes = "misc";
			switch ($zwebtype) {
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
			$zfilepath = $wtwhandlers->contentpath."/uploads/".$zwebtypes."/".$zwebid."/";
			$zbrowsepath = $wtwhandlers->contenturl."/uploads/".$zwebtypes."/".$zwebid."/";
			$znewfilename = $this->avoidDuplicateFileNames($zfilepath, $zfilename);
			$zdata1 = $wtwhandlers->decode64($zbase64data);
			$znewfilepath = $zbrowsepath.$znewfilename;
			$zsuccess = file_put_contents($zfilepath.$znewfilename, $zdata1);	
			chmod($zfilepath.$znewfilename, octdec(wtw_chmod));			
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-writeDataToFile=".$e->getMessage());
		}
		return array(
			'filename' => $znewfilename,
			'filepath' => $znewfilepath);
	}
	
	public function writeFileFromPath($zfromurl, $zwebtype, $zwebid, $zfilename) {
		/* gets a file form the internet and stores it locally - used mainly to retrieve textures and images from https://3dnet.walktheweb.com */
		global $wtwhandlers;
		$znewfilename = "";
		$znewfilepath = "";
		try {
			if (isset($zfromurl) && !empty($zfromurl)) {
				$zwebtypes = "misc";
				switch ($zwebtype) {
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
				$zfilepath = $wtwhandlers->contentpath."/uploads/".$zwebtypes."/".$zwebid."/";
				$zbrowsepath = $wtwhandlers->contenturl."/uploads/".$zwebtypes."/".$zwebid."/";
				$znewfilename = $this->avoidDuplicateFileNames($zfilepath, $zfilename);
				$znewfilepath = $zbrowsepath.$znewfilename;
				
				if ($wtwhandlers->getFilefromURL($zfromurl, $zfilepath, $znewfilename) == false) {
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
	
	public function setKeyHash($zkey, $zwebtype, $zwebid) {
		/* security hash for downloading/uploading */
		global $wtwhandlers;
		try {
			if (!empty($zkey) && isset($zkey)) {
				$zkey = $wtwhandlers->decode64($zkey);
				$zoptions = ['cost' => 11];
				$zkeyhash = password_hash($zkey, PASSWORD_DEFAULT, $zoptions);
				switch ($zwebtype) {
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
	
	public function saveWebDomain($zoldwebdomainid, $zforcehttps, $zdomainname, $zstartdate, $zexpiredate, $zallowhosting, $zhostprice, $zsslprice, $zhostdays) {
		/* updates the web domain from the admin menu settings page */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			$zwebdomainid = "";
			$zhostuserid = '';
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $wtwhandlers->userid;
			}
			if (isset($zdomainname) && !empty($zdomainname)) {
				/* check to see if web domain is already in use */
				$zresponse = $wtwhandlers->query("
					select * from ".wtw_tableprefix."webdomains
					where lower(domainname)=lower('".$zdomainname."')
					limit 1;");
				if (count($zresponse) > 0) {
					foreach ($zresponse as $zrow) {
						$zwebdomainid = $zrow["webdomainid"];
					}
				} else {
					/* check if passed webdomainid exists */
					$zresponse = $wtwhandlers->query("
						select * from ".wtw_tableprefix."webdomains
						where webdomainid='".$zwebdomainid."'
							and not webdomainid=''
						limit 1;");
					if (count($zresponse) == 0) {
						$zwebdomainid = "";
					}
				}
				
				if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Host")) {
					/* validate data */
					$zforcehttps = $wtwhandlers->checkNumber($zforcehttps, 0);
					$zstartdate = $wtwhandlers->prepCheckDate($zstartdate);
					$zexpiredate = $wtwhandlers->prepCheckDate($zexpiredate);
					$zallowhosting = $wtwhandlers->checkNumber($zallowhosting, 0);
					$zhostprice = $wtwhandlers->checkNumber($zhostprice, 0);
					$zsslprice = $wtwhandlers->checkNumber($zsslprice, 0);
					$zhostdays = $wtwhandlers->checkNumber($zhostdays, 365);
					if ($zforcehttps != 1) {
						$zforcehttps = 0;
					}
					/* update or insert new webdomain */
					if (empty($zwebdomainid) || !isset($zwebdomainid)) {
						$zwebdomainid = $wtwhandlers->getRandomString(16,1);
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."webdomains
							   (webdomainid,
								hostuserid,
								forcehttps,
								domainname,
								startdate,
								expiredate,
								allowhosting,
								hostprice,
								sslprice,
								hostdays,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zwebdomainid."',
								'".$zhostuserid."',
								".$zforcehttps.",
								'".$zdomainname."',
								".$zstartdate.",
								".$zexpiredate.",
								".$zallowhosting.",
								".$zhostprice.",
								".$zsslprice.",
								".$zhostdays.",
								now(),
								'".$wtwhandlers->userid."',
								now(),
								'".$wtwhandlers->userid."');");
					} else {
						if ($wtwhandlers->isUserInRole("Admin")) {
							$wtwhandlers->query("
								update ".wtw_tableprefix."webdomains
								set forcehttps=".$zforcehttps.",
									domainname='".$zdomainname."',
									startdate=".$zstartdate.",
									expiredate=".$zexpiredate.",
									allowhosting=".$zallowhosting.",
									hostprice=".$zhostprice.",
									sslprice=".$zsslprice.",
									hostdays=".$zhostdays.",
									updatedate=now(),
									updateuserid='".$wtwhandlers->userid."',
									deleteddate=null,
									deleteduserid='',
									deleted=0
								where webdomainid='".$zwebdomainid."'
								limit 1;");
						} else {
							$wtwhandlers->query("
								update ".wtw_tableprefix."webdomains
								set forcehttps=".$zforcehttps.",
									domainname='".$zdomainname."',
									startdate=".$zstartdate.",
									expiredate=".$zexpiredate.",
									hostprice=".$zhostprice.",
									sslprice=".$zsslprice.",
									hostdays=".$zhostdays.",
									updatedate=now(),
									updateuserid='".$wtwhandlers->userid."',
									deleteddate=null,
									deleteduserid='',
									deleted=0
								where webdomainid='".$zwebdomainid."'
									and hostuserid='".$zhostuserid."'
									and not hostuserid=''
								limit 1;");
						}
					}
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-saveWebDomain=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function deleteWebDomain($zwebdomainid) {
		/* sets the deleted flag for a web domain */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("Admin")) {
				/* mark webdomain as deleted */
				if (!empty($zwebdomainid) && isset($zwebdomainid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."webdomains
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where webdomainid='".$zwebdomainid."'
						limit 1;");
				}
				$zsuccess = true;
			} else if ($wtwhandlers->isUserInRole("Host")) {
				$zhostuserid = $wtwhandlers->userid;
				/* mark webdomain as deleted */
				if (!empty($zwebdomainid) && isset($zwebdomainid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."webdomains
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where webdomainid='".$zwebdomainid."'
							and hostuserid='".$zhostuserid."'
							and not hostuserid=''
						limit 1;");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-deleteWebDomain=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveWebAlias($zoldwebaliasid, $zforcehttps, $zdomainname, $zcommunitypublishname, $zbuildingpublishname, $zthingpublishname, $zcommunityid, $zbuildingid, $zthingid, $zsitename, $zsitedescription, $zsiteicon, $zfranchise, $zinstanceid) {
		/* updates the web alias from the admin menu settings page */
		global $wtwhandlers;
		$zfranchiseid = '';
		try {
			$zwebalias = '';
			$zwebaliasid = '';
			$zhostuserid = '';
			if (isset($zfranchise) && !empty($zfranchise)) {
				$zfranchise = $wtwhandlers->checkNumber($zfranchise,0);
			} else {
				$zfranchise = 0;
			}
			if (isset($zforcehttps) && !empty($zforcehttps)) {
				$zforcehttps = $wtwhandlers->checkNumber($zforcehttps,0);
				if ($zforcehttps != 1) {
					$zforcehttps = 0;
				}
			} else {
				$zforcehttps = 0;
			}
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
				$zhostuserid = $wtwhandlers->userid;
			}
			/* check to see if web alias pub name is already in use - if found, update it */
			$zresults = $wtwhandlers->query("
				select * from ".wtw_tableprefix."webaliases
				where lower(domainname)=lower('".$zdomainname."')
					and lower(communitypublishname)=lower('".$zcommunitypublishname."')
					and lower(buildingpublishname)=lower('".$zbuildingpublishname."')
					and lower(thingpublishname)=lower('".$zthingpublishname."')
				limit 1;");
			if (count($zresults) > 0) {
				foreach ($zresults as $zrow) {
					$zwebaliasid = $zrow["webaliasid"];
				}
			}
			if (isset($zoldwebaliasid) && !empty($zoldwebaliasid) && empty($zwebaliasid)) {
				/* check if passed webaliasid is found - only used if pub name is not found */
				$zresults = $wtwhandlers->query("
					select * from ".wtw_tableprefix."webaliases
					where webaliasid='".$zoldwebaliasid."'
						and not webaliasid=''
					limit 1;");
				foreach ($zresults as $zrow) {
					$zwebaliasid = $zrow["webaliasid"];
				}
			}
			/* set the webalias url */
			$zwebalias = 'http://';
			if ($zforcehttps == '1') {
				$zwebalias = 'https://';
			}
			$zwebalias .= $zdomainname;
			if ((!isset($zcommunityid) || empty($zcommunityid)) && isset($zbuildingid) && !empty($zbuildingid)) {
				$zwebalias .= '/buildings/'.$zbuildingpublishname;
				if (isset($zthingid) && !empty($zthingid)) {
					$zwebalias .= '/'.$zthingpublishname;
				}
			} else if ((!isset($zcommunityid) || empty($zcommunityid)) && (!isset($zbuildingid) || empty($zbuildingid)) && isset($zthingid) && !empty($zthingid)) {
				$zwebalias .= '/things/'.$zthingpublishname;
			} else if (isset($zcommunityid) && !empty($zcommunityid) && isset($zcommunitypublishname) && !empty($zcommunitypublishname)) {
				$zwebalias .= '/'.$zcommunitypublishname;
				if (isset($zbuildingid) && !empty($zbuildingid) && isset($zbuildingpublishname) && !empty($zbuildingpublishname)) {
					$zwebalias .= '/'.$zbuildingpublishname;
				}
				if (isset($zthingid) && !empty($zthingid) && isset($zthingpublishname) && !empty($zthingpublishname)) {
					$zwebalias .= '/'.$zthingpublishname;
				}
			}
			/* save the webalias */
			if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Developer") || $wtwhandlers->isUserInRole("Host")) {
				/* update or insert new webalias */
				if (empty($zwebaliasid) || !isset($zwebaliasid)) {
					$zwebaliasid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."webaliases
						   (webaliasid,
						    hostuserid,
							forcehttps,
							domainname,
							webalias,
							communityid,
							communitypublishname,
							buildingid,
							buildingpublishname,
							thingid,
							thingpublishname,
							sitename, 
							sitedescription,
							siteicon,
							franchise,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zwebaliasid."',
						    '".$zhostuserid."',
							".$zforcehttps.",
							'".$zdomainname."',
							'".$zwebalias."',
							'".$zcommunityid."',
							'".$zcommunitypublishname."',
							'".$zbuildingid."',
							'".$zbuildingpublishname."',
							'".$zthingid."',
							'".$zthingpublishname."',
							'".$zsitename."',
							'".$zsitedescription."',
							'".$zsiteicon."',
							".$zfranchise.",
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
				} else {
					if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Developer")) {
						/* admin and developers can update any web aliases on the server */
						$wtwhandlers->query("
							update ".wtw_tableprefix."webaliases
							set forcehttps=".$zforcehttps.",
								domainname='".$zdomainname."',
								webalias='".$zwebalias."',
								communityid='".$zcommunityid."',
								communitypublishname='".$zcommunitypublishname."',
								buildingid='".$zbuildingid."',
								buildingpublishname='".$zbuildingpublishname."',
								thingid='".$zthingid."',
								thingpublishname='".$zthingpublishname."',
								sitename='".$zsitename."',
								sitedescription='".$zsitedescription."',
								siteicon='".$zsiteicon."',
								franchise=".$zfranchise.",
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where webaliasid='".$zwebaliasid."'
							limit 1;");
					} else {
						/* host role can only update their own web aliases */
						$wtwhandlers->query("
							update ".wtw_tableprefix."webaliases
							set forcehttps=".$zforcehttps.",
								domainname='".$zdomainname."',
								webalias='".$zwebalias."',
								communityid='".$zcommunityid."',
								communitypublishname='".$zcommunitypublishname."',
								buildingid='".$zbuildingid."',
								buildingpublishname='".$zbuildingpublishname."',
								thingid='".$zthingid."',
								thingpublishname='".$zthingpublishname."',
								sitename='".$zsitename."',
								sitedescription='".$zsitedescription."',
								siteicon='".$zsiteicon."',
								franchise=".$zfranchise.",
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where webaliasid='".$zwebaliasid."'
								and hostuserid='".$zhostuserid."'
								and not hostuserid=''
							limit 1;");
					}
				}
				/* report Franchises change to WalkTheWeb */
				$zdisplayname = '';
				$zemail = '';
				$zuploadpathid = '';
				$zfoundfranchiseid = '';
				$zsitepreview = '';
				$zresults = $wtwhandlers->query("
					select * from ".wtw_tableprefix."users 
					where userid='".$wtwhandlers->userid."'
					order by createdate
					limit 1;");
				foreach ($zresults as $zrow) {
					$zdisplayname = $zrow["displayname"];
					$zemail = $zrow["email"];
					$zuploadpathid = $zrow["uploadpathid"];
				}
				if (isset($zwebaliasid) && !empty($zwebaliasid)) {
					/* check if passed webaliasid is found - only used if pub name is not found */
					$zresults = $wtwhandlers->query("
						select w1.*,
							c1.communityname,
							b1.buildingname,
							t1.thingname,
							c1.snapshotid as communitysnapshotid,
							b1.snapshotid as buildingsnapshotid,
							t1.snapshotid as thingsnapshotid,
							case when c1.snapshotid is null then ''
								else (select filepath 
									from ".wtw_tableprefix."uploads 
									where uploadid=c1.snapshotid limit 1)
								end as communitysnapshoturl,
							case when b1.snapshotid is null then ''
								else (select filepath 
									from ".wtw_tableprefix."uploads 
									where uploadid=b1.snapshotid limit 1)
								end as buildingsnapshoturl,
							case when t1.snapshotid is null then ''
								else (select filepath 
									from ".wtw_tableprefix."uploads 
									where uploadid=t1.snapshotid limit 1)
								end as thingsnapshoturl
						from ".wtw_tableprefix."webaliases w1
							left join ".wtw_tableprefix."communities c1
								on w1.communityid=c1.communityid
							left join ".wtw_tableprefix."buildings b1
								on w1.buildingid=b1.buildingid
							left join ".wtw_tableprefix."things t1
								on w1.thingid=t1.thingid
						where w1.deleted=0
							and w1.webaliasid='".$zwebaliasid."'
						limit 1;");
					foreach ($zresults as $zrow) {
						$zfoundfranchiseid = $zrow["franchiseid"];
						if (isset($zrow["communityid"]) && !empty($zrow["communityid"]) && isset($zrow["communitysnapshoturl"]) && !empty($zrow["communitysnapshoturl"])) {
							$zsitepreview = $zrow["communitysnapshoturl"];
						} else  if (isset($zrow["buildingid"]) && !empty($zrow["buildingid"]) && isset($zrow["buildingsnapshoturl"]) && !empty($zrow["buildingsnapshoturl"])) {
							$zsitepreview = $zrow["buildingsnapshoturl"];
						} else  if (isset($zrow["thingid"]) && !empty($zrow["thingid"]) && isset($zrow["thingsnapshoturl"]) && !empty($zrow["thingsnapshoturl"])) {
							$zsitepreview = $zrow["thingsnapshoturl"];
						}
					}
				}
				if (isset($zsiteicon) && !empty($zsiteicon)) {
					if (strpos($zsiteicon,'https://') === false && strpos($zsiteicon,'http://') === false) {
						$zsiteicon = $wtwhandlers->domainurl.$zsiteicon;
					}
				}
				if (isset($zsitepreview) && !empty($zsitepreview)) {
					if (strpos($zsitepreview,'https://') === false && strpos($zsitepreview,'http://') === false) {
						$zsitepreview = $wtwhandlers->domainurl.$zsitepreview;
					}
				}
				$zrequest = stream_context_create(array('http' =>
					array(
						'method'  => 'POST',
						'header'  => 'Content-Type: application/x-www-form-urlencoded',
						'content' => http_build_query(
							array(
								'serverinstanceid' => $wtwhandlers->serverinstanceid,
								'serverip' => $wtwhandlers->serverip,
								'domainname' => $zdomainname,
								'domainurl' => base64_encode($wtwhandlers->domainurl),
								'instanceid' => $zinstanceid,
								'userid' => $wtwhandlers->userid,
								'hostuserid' => $zhostuserid,
								'userip' => $wtwhandlers->userip,
								'globaluserid' => base64_encode($wtwhandlers->globaluserid),
								'usertoken' => $wtwhandlers->usertoken,
								'displayname' => $zdisplayname,
								'email' => $zemail,
								'uploadpathid' => $zuploadpathid,
								'webaliasid' => $zwebaliasid,
								'forcehttps' => $zforcehttps,
								'webalias' => $zwebalias,
								'communityid' => $zcommunityid,
								'communitypublishname' => $zcommunitypublishname,
								'buildingid' => $zbuildingid,
								'buildingpublishname' => $zbuildingpublishname,
								'thingid' => $zthingid,
								'thingpublishname' => $zthingpublishname,
								'franchise' => $zfranchise,
								'franchiseid' => $zfoundfranchiseid,
								'sitename' => $zsitename,
								'sitedescription' => $zsitedescription,
								'siteicon' => $zsiteicon,
								'sitepreview' => $zsitepreview,
								'function' => 'franchisechange'
							)
						)
					)
				));
					
				$zresponse = $wtwhandlers->openFilefromURL('https://3dnet.walktheweb.com/connect/franchises.php', false, $zrequest);			
				if (!empty($zresponse) && isset($zresponse)) {
					$zresponse = json_decode($zresponse);
					$zfranchiseid = '';
					if (isset($zresponse->franchiseid) && !empty($zresponse->franchiseid)) {
						$zfranchiseid = $zresponse->franchiseid;
						$wtwhandlers->query("
						update ".wtw_tableprefix."webaliases
						set franchiseid='".$zfranchiseid."'
						where webaliasid='".$zwebaliasid."'
						limit 1;");
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-saveWebAlias=".$e->getMessage());
		}
		return $zfranchiseid;
	}
	
	public function deleteWebAlias($zwebaliasid) {
		/* sets the deleted flag for a web alias */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("Admin")) {
				/* mark webalias as deleted */
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
			} else if ($wtwhandlers->isUserInRole("Host")) {
				$zhostuserid = $wtwhandlers->userid;
				/* mark webalias as deleted */
				if (!empty($zwebaliasid) && isset($zwebaliasid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."webaliases
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where webaliasid='".$zwebaliasid."'
							and hostuserid='".$zhostuserid."'
							and not hostuserid=''
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
		/* sets the image transparency */
		$zhastransparency = false;
		try {
			if (is_resource($zfiledata)) {
				$zshrinkfactor      = 64.0;
				$zminsquaretoshrink = 64.0 * 64.0;
				$zwidth  = imagesx($zfiledata);
				$zheight = imagesy($zfiledata);
				$zsquare = $zwidth * $zheight;
				$zthumb = null;
				if ($zsquare <= $zminsquaretoshrink) {
					$zthumb = $zfiledata;
					$zthumbwidth = $zwidth;
					$zthumbheight = $zheight;
				} else {
					$thumbSquare = $zsquare / $zshrinkfactor;
					$zthumbwidth  = (int) round($zwidth / sqrt($zshrinkfactor));
					$zthumbwidth < 1 and $zthumbwidth = 1;
					$zthumbheight = (int) round($thumbSquare / $zthumbwidth);
					$zthumb       = imagecreatetruecolor($zthumbwidth, $zthumbheight);
					imagealphablending($zthumb, false);
					imagecopyresized($zthumb, $zfiledata, 0, 0, 0, 0, $zthumbwidth, $zthumbheight, $zwidth, $zheight);
				}
				for ($i = 0; $i < $zthumbwidth; $i++) { 
					for ($j = 0; $j < $zthumbheight; $j++) {
						if (imagecolorat($zthumb, $i, $j) & 0x7F000000) {
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
		/* retrieve uploaded 3D Object file settings from the database */
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
		/* retrieve uploaded 3D Object file details settings from the database */
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
		/* retrieve uploaded 3D Object file details settings from the 3D Object folder */
		global $wtwhandlers;
		$zresults = array();
		try {
			$i = 0;
			$zdir = str_replace('/content',$wtwhandlers->contentpath,$zobjectfolder);
			$zdir = rtrim($zdir, "/");
			if (is_dir($zdir)) {
				if ($zdh = opendir($zdir)) {
					while (($zfile = readdir($zdh)) !== false) {
						if ($zfile != '.' && $zfile != '..') {
							$zresults[$i] = array(
								'file'=> $zfile,
								'folder'=> base64_encode($zobjectfolder)
							);
							$i += 1;
						}
					}
					closedir($zdh);
				}
			}
			/* sort the results by file name */
			function arraysort($a, $b) {
				return ($a["file"] > $b["file"]) ? 1 : -1;
			}
			usort($zresults, "arraysort");
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwuploads.php-getUploadedFileFilesDetails=".$e->getMessage());
		}
		return $zresults;
	}
	
	public function uploadFile($zuploadfile) {
		/* upload file process */
		global $wtwhandlers;
		try {
			$wtwhandlers->checkContentFolders('', '', '', '');
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
						chmod($ztargetfile, octdec(wtw_chmod));
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
		/* upload multiple files */
		global $wtwhandlers;
		$serror = "";
		try {
			$wtwhandlers->checkContentFolders('', '', '', '');
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zfilepath = $wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/media/";
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, octdec(wtw_chmod), true);
					chmod($zfilepath, octdec(wtw_chmod));
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
							chmod($ztargetfile, octdec(wtw_chmod));
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
		/* upload 3D Object supplimentary files - overwrites any existing files for easy updates - remember users may need to clear cache to see changes immediately */
		global $wtwhandlers;
		$serror = "";
		try {
			$wtwhandlers->checkContentFolders('', '', '', '');
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zfilepath = $wtwhandlers->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects/".$zobjectfilepart;
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, octdec(wtw_chmod), true);
					chmod($zfilepath, octdec(wtw_chmod));
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
					if(strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "manifest" && strtolower($zfileextension) != "txt" && strtolower($zfileextension) != "jpg" && strtolower($zfileextension) != "png" && strtolower($zfileextension) != "jpeg" && strtolower($zfileextension) != "gif" && strtolower($zfileextension) != "tif" && strtolower($zfileextension) != "wav" && strtolower($zfileextension) != "mp3" && strtolower($zfileextension) != "mp4" && strtolower($zfileextension) != "webm" && strtolower($zfileextension) != "ogv" && strtolower($zfileextension) != "bin" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "bgltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "blend" && strtolower($zfileextension) != "blend1" && strtolower($zfileextension) != "obj" && strtolower($zfileextension) != "fbx" && strtolower($zfileextension) != "log") {
						$serror .= "Only babylon, gltf, glb, obj, blend, and image files are allowed at this time.";
						$zisvalid = 0;
					}
					if ($zisvalid == 1) {
						if (move_uploaded_file($zuploadfiles["tmp_name"][$i], $ztargetfile)) {
							chmod($ztargetfile, octdec(wtw_chmod));
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

	public function uploadJavaScriptFiles($zuploadfiles, $zwebtype, $zwebid, $zactionzoneid) {
		/* upload javascript files for use with plugins */
		global $wtwhandlers;
		$serror = "";
		try {
			$wtwhandlers->checkContentFolders('', '', '', '');
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zfilepath = $wtwhandlers->contentpath."/uploads/".$zwebtype."/".$zwebid;
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, octdec(wtw_chmod), true);
					chmod($zfilepath, octdec(wtw_chmod));
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
							chmod($ztargetfile, octdec(wtw_chmod));
							$this->saveJavaScriptFile($zactionzoneid, $zwebtype, $zwebid, $zpastfilename);
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

	public function saveJavaScriptFile($zactionzoneid, $zwebtype, $zwebid, $zscriptpath) {
		/* save javascript file references to the database */
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
								webtype,
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
								'".$zwebtype."',
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

	public function deleteJavaScriptFile($zwebtype, $zwebid, $zactionzoneid, $zscriptid, $zscriptpath) {
		/* sets deleted flag for javascript file reference */
		global $wtwhandlers;
		$serror = "";
		try {
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zfilepath = $wtwhandlers->contentpath."/uploads/".$zwebtype."/".$zwebid."/".$zscriptpath;
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
		/* deletes the 3D Object file - used to assist with overwrite functions */
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
		/* gets Media Library images by category */
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
					and u1.pastuploadid=''
					and u1.stock=0
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
		/* gets Media Library Images - stock images */
		global $wtwhandlers;
		$zresults = array();
		try {
			if (strpos($zitem, 'sound')) {
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."uploads
					where deleted=0
						and pastuploadid=''
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
		/* gets Media Library Images - images already in this 3D Community, Building, or Thing */
		global $wtwhandlers;
		$zresults = array();
		try {
			$zwebtype = "";
			$ztable = "";
			$zwebid = "";
			if (!empty($zcommunityid) && isset($zcommunityid)) {
				$zwebtype = "community";
				$ztable = "communities";
				$zwebid = $zcommunityid;
			} else if (!empty($zbuildingid) && isset($zbuildingid)) {
				$zwebtype = "building";
				$ztable = "buildings";
				$zwebid = $zbuildingid;
			} else if (!empty($zthingid) && isset($zthingid)) {
				$zwebtype = "thing";
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
									from ".wtw_tableprefix.$zwebtype."molds t1
									left join ".wtw_tableprefix."webimages w1 
										on t1.".$zwebtype."moldid=w1.".$zwebtype."moldid 
									where t1.".$zwebtype."id='".$zwebid."' 
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
		/* sets image to hide/show like an archive function */
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
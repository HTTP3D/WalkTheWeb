<?php
class wtwreadyplayerme_functions {
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
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-construct=".$e->getMessage());
		}
	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function initClass() {
		global $wtwplugins;
		try {
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-initClass=".$e->getMessage());
		}
	}
	
	

	public function getAvatarAnimations() {
		/* save avatar animation settings for ReadyPlayerMe avatars */
		global $wtwplugins;
		$zresponse = array();
		try {
			$zresults = $wtwplugins->query("
				select a1.* 
					from ".WTW_READYPLAYERME_PREFIX."avataranimations a1
					inner join (
						select animationevent, max(updatedate) as updatedate, max(avataranimationid) as avataranimationid 
						from ".WTW_READYPLAYERME_PREFIX."avataranimations 
						where deleted=0
							and not animationevent='onoption'
						group by animationevent) a2
					on a1.avataranimationid = a2.avataranimationid
					where a1.deleted=0
				union
				select a3.* 
					from ".WTW_READYPLAYERME_PREFIX."avataranimations a3
					inner join (
						select animationfriendlyname, max(updatedate) as updatedate, max(avataranimationid) as avataranimationid 
						from ".WTW_READYPLAYERME_PREFIX."avataranimations 
						where deleted=0
							and animationevent='onoption'
						group by animationfriendlyname) a4
					on a3.avataranimationid = a4.avataranimationid
					where a3.deleted=0
				order by loadpriority desc, animationevent, animationfriendlyname, avataranimationid;");
			$zanimationind = 0;
			$zevent = '';
			foreach ($zresults as $zrow) {
				/* avoid duplicate animations for the same event, except for optional ones */
				if ($zrow["animationevent"] != $zevent || $zrow["animationevent"] == 'onoption') {
					$zanimationloop = true;
					if ($zrow["animationloop"] != '1') {
						$zanimationloop = false;
					}
					$zresponse[$zanimationind] = array(
						'animationind'=> -1,
						'useravataranimationid'=> '',
						'avataranimationid'=> $zrow["avataranimationid"],
						'loadpriority'=> (int)$zrow["loadpriority"],
						'animationevent'=> $zrow["animationevent"],
						'animationfriendlyname'=> $zrow["animationfriendlyname"],
						'animationicon'=> $zrow["animationicon"],
						'objectfolder'=> $zrow["objectfolder"]."fullbody/",
						'objectfile'=> $zrow["objectfile"],
						'startframe'=> $zrow["startframe"],
						'endframe'=> $zrow["endframe"],
						'animationloop'=> $zanimationloop,
						'defaultspeedratio'=> $zrow["speedratio"],
						'speedratio'=> $zrow["speedratio"],
						'startweight'=> '0',
						'onanimationend'=> null,
						'walkspeed'=> '1',
						'totalframes'=> '0',
						'totalstartframe'=> '0',
						'totalendframe'=> '0',
						'soundid'=> $zrow["soundid"],
						'soundpath'=> $zrow["soundpath"],
						'soundmaxdistance'=> $zrow["soundmaxdistance"]
					);
					$zanimationind += 1;
					$zevent = $zrow["animationevent"];
				}
			}
			function arraysort($a, $b) {
				if ($a["loadpriority"] == $b["loadpriority"]) {
					return ($a["animationfriendlyname"] > $b["animationfriendlyname"]) ? 1 : -1;
				}
				return ($a["loadpriority"] < $b["loadpriority"]) ? 1 : -1;
			}
			usort($zresponse, "arraysort");
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-getAvatarAnimations=".$e->getMessage());
		}
		return $zresponse;
	}

	public function saveAvatarAnimation($zavataranimationid,$zanimationevent,$zspeedratio) {
		/* save avatar animation settings for ReadyPlayerMe avatars */
		global $wtwplugins;
		try {
			$zfoundavataranimationid = "";
			$zresults = $wtwplugins->query("
					select avataranimationid 
					from ".WTW_READYPLAYERME_PREFIX."avataranimations 
					where animationevent='".$zanimationevent."' 
						and (not animationevent='') 
						and avataranimationid='".$zavataranimationid."' 
						and not avataranimationid='' 
					limit 1;");
			foreach ($zresults as $zrow) {
				$zfoundavataranimationid = $zrow["avataranimationid"];
			}
			if ($zanimationevent == 'onoption' && isset($zavataranimationid) && !empty($zavataranimationid)) {
				$zfoundavataranimationid = $zavataranimationid;
			} else if ($zanimationevent == 'onoption') {
				$zfoundavataranimationid = "";
			}
			if ($wtwplugins->hasValue($zfoundavataranimationid)) {
				$wtwplugins->query("
					update ".WTW_READYPLAYERME_PREFIX."avataranimations
					set animationevent='".$zanimationevent."',
						 speedratio=".$wtwplugins->checkNumber($zspeedratio,1).",
						 updatedate=now(),
						 updateuserid='".$wtwplugins->userid."',
						 deleteddate=null,
						 deleteduserid='',
						 deleted=0
					where avataranimationid='".$zfoundavataranimationid."';");
			} else {
				$zfoundavataranimationid = $wtwplugins->getRandomString(16,1);
				$wtwplugins->query("
					insert into ".WTW_READYPLAYERME_PREFIX."avataranimations
						(avataranimationid,
						 animationevent,
						 speedratio,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
						values
						('".$zfoundavataranimationid."',
						 '".$zanimationevent."',
						 ".$wtwplugins->checkNumber($zspeedratio,1).",
						 now(),
						 '".$wtwplugins->userid."',
						 now(),
						 '".$wtwplugins->userid."');");
			}
			$zavataranimationid = $zfoundavataranimationid;
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-saveAvatarAnimation=".$e->getMessage());
		}
		return $zavataranimationid;
	}

	public function deleteAvatarAnimation($zavataranimationid) {
		/* flags deleted when remove animation from ReadyPlayerMe avatars */
		global $wtwplugins;
		$zsuccess = false;
		try {
			$wtwplugins->query("
				update ".WTW_READYPLAYERME_PREFIX."avataranimations
				set deleteddate=now(),
					deleteduserid='".$wtwplugins->userid."',
					deleted=1
				where avataranimationid='".$zavataranimationid."';");
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-deleteAvatarAnimation=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveAvatarDefinitionAnimation($zavataranimationid, $zloadpriority, $zanimationevent, $zanimationfriendlyname, $zanimationicon, $zobjectfolder, $zobjectfile, $zstartframe, $zendframe, $zspeedratio) {
		/* saves the avatar animation for ReadyPlayerMe Avatars */
		global $wtwplugins;
		$zresponse = array(
			'serror'=>'',
			'avataranimationid'=>$zavataranimationid
		);
		try {
			if ($wtwplugins->hasPermission(array("admin","developer"))) {
				if (!isset($zloadpriority) || empty($zloadpriority)) {
					$zloadpriority = '0';
				}
				if (!is_numeric($zloadpriority)) {
					$zloadpriority = '0';
				}
				if (!isset($zstartframe) || empty($zstartframe)) {
					$zstartframe = '1';
				}
				if (!is_numeric($zstartframe)) {
					$zstartframe = '1';
				}
				if (!isset($zendframe) || empty($zendframe)) {
					$zendframe = '1';
				}
				if (!is_numeric($zendframe)) {
					$zendframe = '1';
				}
				if (!isset($zspeedratio) || empty($zspeedratio)) {
					$zspeedratio = '1';
				}
				if (!is_numeric($zspeedratio)) {
					$zspeedratio = '1';
				}
				$zfoundavataranimationid = '';
				$zresults = $wtwplugins->query("
					select avataranimationid
					from ".WTW_READYPLAYERME_PREFIX."avataranimations
					where avataranimationid='".$zavataranimationid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavataranimationid = $zrow["avataranimationid"];
				}
				if ($wtwplugins->hasValue($zfoundavataranimationid)) {
					$wtwplugins->query("
						update ".WTW_READYPLAYERME_PREFIX."avataranimations
						set loadpriority=".$zloadpriority.",
							animationevent='".$zanimationevent."',
							animationfriendlyname='".$zanimationfriendlyname."',
							animationicon='".$zanimationicon."',
							objectfolder='".$zobjectfolder."',
							objectfile='".$zobjectfile."',
							startframe=".$zstartframe.",
							endframe=".$zendframe.",
							speedratio=".$zspeedratio.",
							updatedate=now(),
							updateuserid='".$wtwplugins->userid."'
						where avataranimationid='".$zavataranimationid."'
						limit 1;
					");
				} else {
					if (!isset($zavataranimationid) || empty($zavataranimationid)) {
						$zavataranimationid = $wtwplugins->getRandomString(16,1);
					}
					$wtwplugins->query("
						insert into ".WTW_READYPLAYERME_PREFIX."avataranimations
						   (avataranimationid,
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
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavataranimationid."',
							".$zloadpriority.",
							'".$zanimationevent."',
							'".$zanimationfriendlyname."',
							'".$zanimationicon."',
							'".$zobjectfolder."',
							'".$zobjectfile."',
							".$zstartframe.",
							".$zendframe.",
							1,
							".$zspeedratio.",
							now(),
							'".$wtwplugins->userid."',
							now(),
							'".$wtwplugins->userid."');");
					$zresponse = array(
						'serror'=>'',
						'avataranimationid'=>$zavataranimationid
					);
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avataranimationid'=>$zavataranimationid
				);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-saveAvatarDefinitionAnimation=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avataranimationid'=>$zavataranimationid
			);
		}
		return $zresponse;
	}

	public function deleteAvatarDefinitionAnimation($zavataranimationid) {
		/* delete the avatar animation (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwplugins;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwplugins->hasPermission(array("admin","developer"))) {
				$zfoundavataranimationid = '';
				$zresults = $wtwplugins->query("
					select avataranimationid
					from ".wtw_tableprefix."avataranimations
					where avataranimationid='".$zavataranimationid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavataranimationid = $zrow["avataranimationid"];
				}
				if ($wtwplugins->hasValue($zfoundavataranimationid)) {
					$wtwplugins->query("
						update ".wtw_tableprefix."avataranimations
						set deleteddate=now(),
							deleteduserid='".$wtwplugins->userid."',
							deleted=1
						where avataranimationid='".$zavataranimationid."'
						limit 1;
					");
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions'
				);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-deleteAvatarDefinitionAnimation=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}

	public function uploadAvatarFile($zuploadfile, $zobjectfolder) {
		/* upload file process */
		global $wtwplugins;
		$zresponse = array(
			'serror'=> '',
			'objectfolder'=> $zobjectfolder,
			'objectfile'=> ''
		);
		try {
			$wtwplugins->checkContentFolders('', '', '', '');
			if ($wtwplugins->hasPermission(array("admin","developer"))) {
				$zmaxfilesize = $wtwplugins->getMaximumFileUploadSize();
				$zfilepath = wtw_rootpath.$zobjectfolder;
				$wtwplugins->verifyFolderExists($zfilepath);
				if ($wtwplugins->endsWith($zfilepath, "/") == false) {
					$zfilepath .= "/";
				}
				$zisvalid = 1;
				$zpastfilename = basename($zuploadfile["name"]);
				$zfileextension = pathinfo($zfilepath.$zpastfilename,PATHINFO_EXTENSION);
				$zfilesize = $zuploadfile["size"];
				$zfiletype = $zuploadfile["type"];
				$zfilename = $wtwplugins->getRandomString(16,1).".".$zfileextension;
				$ztargetfile = $zfilepath.$zpastfilename;
				if ($zfilesize > $zmaxfilesize) {
					$zresponse = array(
						'serror'=> "Your file is too large.",
						'objectfolder'=> '',
						'objectfile'=> ''
					);
					$zisvalid = 0;
				}
				if (strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "obj") {
					$zresponse = array(
						'serror'=> "Only babylon, gltf, glb, and obj files are allowed at this time.",
						'objectfolder'=> '',
						'objectfile'=> ''
					);
					$zisvalid = 0;
				}
				if ($zisvalid == 0) {
					$zresponse = array(
						'serror'=> "There was an error uploading your files.",
						'objectfolder'=> '',
						'objectfile'=> ''
					);
				} else {
					if (move_uploaded_file($zuploadfile["tmp_name"], $ztargetfile)) {
						umask(0);
						chmod($ztargetfile, octdec(wtw_chmod));
						if (defined('wtw_umask')) {
							/* reset umask */
							if (wtw_umask != '0') {
								umask(octdec(wtw_umask));
							}
						}
						$zresponse = array(
							'serror'=> '',
							'objectfolder'=> $zobjectfolder,
							'objectfile'=> $zpastfilename
						);
					} else {
						$zresponse = array(
							'serror'=> "There was an error uploading your files.",
							'objectfolder'=> '',
							'objectfile'=> ''
						);
					}
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-uploadAvatarFile=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'objectfolder'=> '',
				'objectfile'=> ''
			);
		}
		return $zresponse;
	}

	public function uploadAvatarFiles($zuploadfiles, $zobjectfolder) {
		/* upload 3D Object supplimentary files - overwrites any existing files for easy updates - remember users may need to clear cache to see changes immediately */
		global $wtwplugins;
		$zresponse = array(
			'serror'=> '',
			'objectfolder'=> $zobjectfolder,
			'objectfile'=> ''
		);
		try {
			$wtwplugins->checkContentFolders('', '', '', '');
			if ($wtwplugins->hasPermission(array("admin","developer"))) {
				$zmaxfilesize = $wtwplugins->getMaximumFileUploadSize();
				$zfilepath = wtw_rootpath.$zobjectfolder;
				$wtwplugins->verifyFolderExists($zfilepath);
				if ($wtwplugins->endsWith($zfilepath, "/") == false) {
					$zfilepath .= "/";
				}
				for ($i = 0; $i < count($zuploadfiles["name"]);$i++) {
					$zisvalid = 1;
					$zpastfilename = basename($zuploadfiles["name"][$i]);
					$zfileextension = pathinfo($zfilepath.$zpastfilename,PATHINFO_EXTENSION);
					$zfilesize = $zuploadfiles["size"][$i];
					$zfiletype = $zuploadfiles["type"][$i];
					$ztargetfile = $zfilepath.$zpastfilename;
					if ($zfilesize > $zmaxfilesize) {
						$zresponse = array(
							'serror'=> "Your file is too large.",
							'objectfolder'=> '',
							'objectfile'=> ''
						);
						$zisvalid = 0;
					}
					if (strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "manifest" && strtolower($zfileextension) != "txt" && strtolower($zfileextension) != "jpg" && strtolower($zfileextension) != "png" && strtolower($zfileextension) != "jpeg" && strtolower($zfileextension) != "gif" && strtolower($zfileextension) != "wav" && strtolower($zfileextension) != "mp3" && strtolower($zfileextension) != "mp4" && strtolower($zfileextension) != "webm" && strtolower($zfileextension) != "ogv" && strtolower($zfileextension) != "bin" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "bgltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "blend" && strtolower($zfileextension) != "blend1" && strtolower($zfileextension) != "obj" && strtolower($zfileextension) != "fbx" && strtolower($zfileextension) != "log") {
						$zresponse = array(
							'serror'=> "Only babylon, gltf, glb, obj, blend, manifest, txt, and image files are allowed at this time.",
							'objectfolder'=> '',
							'objectfile'=> ''
						);
						$zisvalid = 0;
					}
					if ($zisvalid == 1) {
						if (move_uploaded_file($zuploadfiles["tmp_name"][$i], $ztargetfile)) {
							umask(0);
							chmod($ztargetfile, octdec(wtw_chmod));
							if (defined('wtw_umask')) {
								/* reset umask */
								if (wtw_umask != '0') {
									umask(octdec(wtw_umask));
								}
							}
							$zresponse = array(
								'serror'=> $zobjectfolder,
								'objectfolder'=> $zuploadfiles["tmp_name"][$i],
								'objectfile'=> ''
							);
						} else {
							$zresponse = array(
								'serror'=> "There was an error uploading your files.",
								'objectfolder'=> '',
								'objectfile'=> ''
							);
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-uploadAvatarFiles=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'objectfolder'=> '',
				'objectfile'=> ''
			);
		}
		return $zresponse;
	}

	public function deleteAvatarFile($zfilename, $zobjectfolder) {
		/* deletes the 3D Object file - used to assist with overwrite functions */
		global $wtwplugins;
		$zresponse = array(
			'serror'=> ''
		);
		try {
			if ($wtwplugins->hasPermission(array("admin","developer"))) {
				$zfilepath = wtw_rootpath.$zobjectfolder.$zfilename;
				if (file_exists($zfilepath)) {
					unlink($zfilepath);
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-deleteAvatarFile=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function getAnonymousUserId($zwtwaccount) {
		/* call readyplayerme for anonymous user account */
		global $wtwplugins;
		$zresponse = array(
			'serror'=> ''
		);
		try {
			if (!isset($zwtwaccount) || empty($zwtwaccount)) {
				/* use local account */
				$zuserip = $wtwplugins->userip;
				$ztoken = '';
				$zid = '';
				if (isset($zuserip) && !empty($zuserip)) {
					$zresults = $wtwplugins->query("
						select token, userid
						from ".wtw_tableprefix."usertokens
						where userip='".$zuserip."'
						limit 1;");
					foreach ($zresults as $zrow) {
						$ztoken = $zrow["token"];
						$zid = $zrow["userid"];
						$wtwplugins->query("
							update ".wtw_tableprefix."usertokens
								set lastdate=now()
								where userip='".$zuserip."';
						");
					}
					$zresponse = array(
						'token'=>$ztoken,
						'id'=>$zid,
						'serror'=> ''
					);
				}
				
				if (!isset($ztoken) || empty($ztoken)) {
				
					$zsubdomain = $wtwplugins->getSetting("wtwreadyplayerme_subdomain","https://wtw.readyplayer.me");
					$zapplicationid = $wtwplugins->getSetting("wtwreadyplayerme_applicationid","");
					$zurl = $zsubdomain.'/api/users';
					$zgetfile = curl_init($zurl);

					/* Create Anonymous User */
					curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($zgetfile, CURLOPT_POST, 1);
					curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("data"=>array("applicationId"=>$zapplicationid))));
					$zheaders = array();
					$zheaders[] = 'Content-Type: application/json';
					curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

					$zdata = curl_exec($zgetfile);
					$curl_errno = curl_errno($zgetfile);
					$curl_error = curl_error($zgetfile);

					curl_close($zgetfile);
					$zarray = json_decode($zdata);
					if (isset($zarray->data->id)) {
						$zid = $zarray->data->id;
					}
					if (isset($zarray->data->token)) {
						$ztoken = $zarray->data->token;
					}
					
					$wtwplugins->query("
						insert into ".wtw_tableprefix."usertokens
						   (userip,
						    userid,
							token,
							createdate,
							lastdate)
						  values
						   ('".$zuserip."',
						    '".$zid."',
							'".$ztoken."',
							now(),
							now());");
					
					$zresponse = array(
						'data'=> $zdata,
						'token'=>$ztoken,
						'id'=>$zid,
						'serror'=> $curl_errno.": ".$curl_error
					);
				}
				$wtwplugins->saveSetting("wtwreadyplayerme_token",$ztoken);
			} else {
				/* use WalkTheWeb account */
				$zfromurl = "https://3dnet.walktheweb.com/ReadyPlayerMe/connect/avatars.php";
				
				$zgetfile = curl_init($zfromurl);
				curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zgetfile, CURLOPT_POST, 1);
				curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("function"=>"getAnonymousUserId")));
				$zheaders = array();
				$zheaders[] = 'Content-Type: application/json';
				curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

				$zresponse = curl_exec($zgetfile);
				$zresponse = json_decode(stripslashes($zresponse));
				curl_close($zgetfile);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-getAnonymousUserId=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function getAvatarTemplates($zwtwaccount, $ztoken) {
		/* call readyplayerme for avatar templates */
		global $wtwplugins;
		$zresponse = array(
			'serror'=> ''
		);
		try {
			if (!isset($zwtwaccount) || empty($zwtwaccount)) {
				/* use local account */
				$zurl = 'https://api.readyplayer.me/v2/avatars/templates';
				$zgetfile = curl_init($zurl);

				/* retrieve avatar templates list */
				curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zgetfile, CURLOPT_POST, 0);
				$zheaders = array();
				$zheaders[] = 'Content-Type: application/json';
				$zheaders[] = 'Authorization: Bearer '.$ztoken;
				curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

				$zdata = curl_exec($zgetfile);
				$zdata = json_decode(stripslashes($zdata));
				
				$curl_errno = curl_errno($zgetfile);
				$curl_error = curl_error($zgetfile);
				curl_close($zgetfile);

				$zresponse = array(
					'data'=> $zdata,
					'serror'=> $curl_errno.": ".$curl_error
				);
			} else {
				/* use WalkTheWeb account */
				$zfromurl = "https://3dnet.walktheweb.com/ReadyPlayerMe/connect/avatars.php";
				
				$zgetfile = curl_init($zfromurl);
				curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zgetfile, CURLOPT_POST, 1);
				curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("function"=>"getAvatarTemplates", "token"=> $ztoken)));
				$zheaders = array();
				$zheaders[] = 'Content-Type: application/json';
				curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

				$zresponse = curl_exec($zgetfile);
				$zresponse = json_decode(stripslashes($zresponse));
				curl_close($zgetfile);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-getAvatarTemplates=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function createDraftAvatar($zwtwaccount, $ztoken, $zavatarid) {
		/* call readyplayerme to create draft avatar */
		global $wtwplugins;
		$zresponse = array(
			'serror'=> ''
		);
		try {
			if (!isset($zwtwaccount) || empty($zwtwaccount)) {
				/* use local account */
				$zsubdomain = $wtwplugins->getSetting("wtwreadyplayerme_subdomain","https://wtw.readyplayer.me");
				$zpartner = str_replace(".readyplayer.me","",str_replace("https://","",$zsubdomain));
				$zurl = 'https://api.readyplayer.me/v2/avatars/templates/'.$zavatarid;
				$zgetfile = curl_init($zurl);

				/* create and retrieve draft avatar info */
				curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zgetfile, CURLOPT_POST, 1);
				curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("data"=>array("partner"=>$zpartner, "bodyType"=>"fullbody")))); /* fullbody or fullbody-xr */
				$zheaders = array();
				$zheaders[] = 'Content-Type: application/json';
				$zheaders[] = 'Authorization: Bearer '.$ztoken;
				curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

				$zdata = curl_exec($zgetfile);
				$zdata = json_decode(stripslashes($zdata));
				
				$curl_errno = curl_errno($zgetfile);
				$curl_error = curl_error($zgetfile);
				curl_close($zgetfile);

				$zresponse = array(
					'data'=> $zdata,
					'serror'=> $curl_errno.": ".$curl_error
				);
			} else {
				/* use WalkTheWeb account */
				$zfromurl = "https://3dnet.walktheweb.com/ReadyPlayerMe/connect/avatars.php";
				
				$zgetfile = curl_init($zfromurl);
				curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zgetfile, CURLOPT_POST, 1);
				curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("function"=>"createDraftAvatar", "token"=> $ztoken, "avatarid"=> $zavatarid)));
				$zheaders = array();
				$zheaders[] = 'Content-Type: application/json';
				curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

				$zresponse = curl_exec($zgetfile);
				$zresponse = json_decode(stripslashes($zresponse));
				
				$curl_errno = curl_errno($zgetfile);
				$curl_error = curl_error($zgetfile);
				curl_close($zgetfile);
				
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-createDraftAvatar=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function getDraftAvatar($zwtwaccount, $ztoken, $zavatarid) {
		/* call readyplayerme to get draft avatar */
		global $wtwplugins;
		$zresponse = array(
			'serror'=> ''
		);
		try {
			$zfolder = $wtwplugins->contentpath.'/uploads/ReadyPlayerMe';
			$wtwplugins->verifyFolderExists($zfolder);
			if (!isset($zwtwaccount) || empty($zwtwaccount)) {
				/* use local account */
				$zurl = 'https://api.readyplayer.me/v2/avatars/'.$zavatarid.'.glb?preview=true';
				$zgetfile = curl_init($zurl);
				$zdownloadfile = fopen($zfolder.'/'.$zavatarid.'.glb', 'w+');
				/* get draft avatar */
				curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zgetfile, CURLOPT_POST, 0);
				$zheaders = array();
				$zheaders[] = 'Content-Type: model/gltf-binary';
				$zheaders[] = 'Authorization: Bearer '.$ztoken;
				curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);
				curl_setopt($zgetfile, CURLOPT_FILE , $zdownloadfile);

				$zdata = curl_exec($zgetfile);
				$curl_errno = curl_errno($zgetfile);
				$curl_error = curl_error($zgetfile);
				curl_close($zgetfile);
				fclose($zdownloadfile);
				umask(0);
				chmod($zfolder.'/'.$zavatarid.'.glb', octdec(wtw_chmod));
				if (defined('wtw_umask')) {
					/* reset umask */
					if (wtw_umask != '0') {
						umask(octdec(wtw_umask));
					}
				}

				$zresponse = array(
					'avatarurl'=> '/content/uploads/ReadyPlayerMe/'.$zavatarid.'.glb',
					'serror'=> $curl_errno.": ".$curl_error
				);
			} else {
				/* use WalkTheWeb account */
				/* get avatar from 3dnet.walktheweb.com server */
				$zfromurl = "https://3dnet.walktheweb.com/ReadyPlayerMe/connect/avatars.php";
				
				$zgetfile = curl_init($zfromurl);
				curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zgetfile, CURLOPT_POST, 1);
				curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("function"=>"getDraftAvatar", "token"=> $ztoken, "avatarid"=> $zavatarid)));
				$zheaders = array();
				$zheaders[] = 'Content-Type: application/json';
				curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

				$zdata = curl_exec($zgetfile);
				$zdata = json_decode(stripslashes($zdata));
				$curl_errno = curl_errno($zgetfile);
				$curl_error = curl_error($zgetfile);
				
				$zavatarurl = '';
				if (isset($zdata->avatarurl)) {
					$zavatarurl = $zdata->avatarurl;
				}

				curl_close($zgetfile);
				
				if (isset($zavatarurl) && !empty($zavatarurl)) {
					/* download avatar to local server */
					$zgetfile2 = curl_init($zavatarurl);
					curl_setopt($zgetfile2, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($zgetfile2, CURLOPT_POST, 0);
					$zdownloadfile = fopen($zfolder.'/'.$zavatarid.'.glb', 'w+');
					$zheaders = array();
					$zheaders[] = 'Content-Type: model/gltf-binary';
					curl_setopt($zgetfile2, CURLOPT_HTTPHEADER, $zheaders);
					curl_setopt($zgetfile2, CURLOPT_FILE , $zdownloadfile);

					$zdata2 = curl_exec($zgetfile2);

					curl_close($zgetfile2);
					fclose($zdownloadfile);
					umask(0);
					chmod($zfolder.'/'.$zavatarid.'.glb', octdec(wtw_chmod));
					if (defined('wtw_umask')) {
						/* reset umask */
						if (wtw_umask != '0') {
							umask(octdec(wtw_umask));
						}
					}
				}
				$zresponse = array(
					'avatarurl'=> '/content/uploads/ReadyPlayerMe/'.$zavatarid.'.glb',
					'serror'=> $curl_errno.": ".$curl_error
				);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-getDraftAvatar=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function loadChoiceAvatarsArray($zwtwaccount, $ztoken) {
		/* call readyplayerme to get draft avatar */
		global $wtwplugins;
		$zresponse = array(
			'serror'=> ''
		);
		try {
			if (!isset($ztoken) || empty($ztoken)) {
				/* needs token */
				$zuserip = $wtwplugins->userip;
				$zid = '';
				if (!isset($zwtwaccount) || empty($zwtwaccount)) {
					/* use local account */
					$zuserip = $wtwplugins->userip;
					$ztoken = '';
					if (isset($zuserip) && !empty($zuserip)) {
						$zresults = $wtwplugins->query("
							select token, userid
							from ".wtw_tableprefix."usertokens
							where userip='".$zuserip."'
							limit 1;");
						foreach ($zresults as $zrow) {
							$ztoken = $zrow["token"];
							$zid = $zrow["userid"];
							$wtwplugins->query("
								update ".wtw_tableprefix."usertokens
									set lastdate=now()
									where userip='".$zuserip."';
							");
						}
						$zresponse = array(
							'token'=>$ztoken,
							'id'=>$zid,
							'serror'=> ''
						);
					}
					if (!isset($ztoken) || empty($ztoken)) {
						$zsubdomain = $wtwplugins->getSetting("wtwreadyplayerme_subdomain","https://wtw.readyplayer.me");
						$zapplicationid = $wtwplugins->getSetting("wtwreadyplayerme_applicationid","");
						$zurl = $zsubdomain.'/api/users';
						$zgetfile = curl_init($zurl);

						/* Create Anonymous User */
						curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
						curl_setopt($zgetfile, CURLOPT_POST, 1);
						curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("data"=>array("applicationId"=>$zapplicationid))));
						$zheaders = array();
						$zheaders[] = 'Content-Type: application/json';
						curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

						$zdata = curl_exec($zgetfile);
						$curl_errno = curl_errno($zgetfile);
						$curl_error = curl_error($zgetfile);

						$zdata = json_decode(stripslashes($zdata));
						curl_close($zgetfile);
						if (isset($zdata->data->id)) {
							$zid = $zdata->data->id;
						}
						if (isset($zdata->data->token)) {
							$ztoken = $zdata->data->token;
						}

						$wtwplugins->query("
							insert into ".wtw_tableprefix."usertokens
							   (userip,
								userid,
								token,
								createdate,
								lastdate)
							  values
							   ('".$zuserip."',
								'".$zid."',
								'".$ztoken."',
								now(),
								now());");
					}
				} else {
					/* use WalkTheWeb account */
					$zfromurl = "https://3dnet.walktheweb.com/ReadyPlayerMe/connect/avatars.php";
					
					$zgetfile = curl_init($zfromurl);
					curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($zgetfile, CURLOPT_POST, 1);
					curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("function"=>"getAnonymousUserId")));
					$zheaders = array();
					$zheaders[] = 'Content-Type: application/json';
					curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

					$zdata = curl_exec($zgetfile);
					$zdata = json_decode(stripslashes($zdata));
					curl_close($zgetfile);
					if (isset($zdata->token)) {
						$ztoken = $zdata->token;
					}
				}
				$wtwplugins->saveSetting("wtwreadyplayerme_token",$ztoken);
			}
			
			$zdata = null;
			if (!isset($zwtwaccount) || empty($zwtwaccount)) {
//				/ * use local account * /
				$zurl = 'https://api.readyplayer.me/v2/avatars/templates';
				$zgetfile = curl_init($zurl);

//				/ * retrieve avatar templates list * /
				curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zgetfile, CURLOPT_POST, 0);
				$zheaders = array();
				$zheaders[] = 'Content-Type: application/json';
				$zheaders[] = 'Authorization: Bearer '.$ztoken;
				curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

				$zdata = curl_exec($zgetfile);
				$zdata = json_decode(stripslashes($zdata));
				
				$curl_errno = curl_errno($zgetfile);
				$curl_error = curl_error($zgetfile);
				curl_close($zgetfile);
			} else {
//				/ * use WalkTheWeb account * /
				$zfromurl = "https://3dnet.walktheweb.com/ReadyPlayerMe/connect/avatars.php";
				
				$zgetfile = curl_init($zfromurl);
				curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zgetfile, CURLOPT_POST, 1);
				curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("function"=>"getAvatarTemplates", "token"=> $ztoken)));
				$zheaders = array();
				$zheaders[] = 'Content-Type: application/json';
				curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $zheaders);

				$zdata = curl_exec($zgetfile);
				$zdata = json_decode(stripslashes($zdata));
				curl_close($zgetfile);
			}
			$i = 0;
			$zavatars = array();
			foreach ($zdata->data->data as $zrow) {
				$zavatarid = '';
				$zimageurl = '';
				$zgender = '';
				$zscale = rand(80,85)/10;
				if (isset($zrow->id) && !empty($zrow->id)) {
					$zavatarid = $zrow->id;
				}
				if (isset($zrow->imageUrl) && !empty($zrow->imageUrl)) {
					$zimageurl = $zrow->imageUrl;
				}
				if (isset($zrow->gender) && !empty($zrow->gender)) {
					$zgender = $zrow->gender;
				}
				$zavatars[count($zavatars)] = array(
					'globaluseravatarid'=> '',
					'useravatarid'=> '',
					'avatarid'=> $zavatarid,
					'versionid'=> $zavatarid,
					'version'=> '1.0.0',
					'versionorder'=> '0',
					'versiondesc'=> 'original',
					'avatargroup'=> 'ReadyPlayerMe',
					'source'=> 'ReadyPlayerMe',
					'displayname'=> '',
					'defaultdisplayname'=> '',
					'avatardescription'=> 'ReadyPlayerMe Avatar',
					'gender'=> $zgender,
					'objects'=> array(
						'folder'=> '',
						'file'=> ''
					),
					'scaling'=> array(
						'x'=> $zscale,
						'y'=> $zscale,
						'z'=> $zscale
					),
					'snapshots'=> array(
						'full'=> $zimageurl,
						'thumbnail'=> $zimageurl
					),
					'sortorder'=> $i
				);
				$i += 1;
			}
			$zresponse = array(
				'avatars'=> $zavatars,
				'serror'=> ''
			);
			
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-loadChoiceAvatarsArray=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function getListBaseModels() {
		/* call readyplayerme for anonymous user account */
		global $wtwplugins;
		$zresponse = array(
			'serror'=> ''
		);
		try {
			$zurl = 'https://api.readyplayer.me/v1/phoenix-assets?applicationId=6747968778427add008cc54d&type=baseModel';
			$zgetfile = curl_init($zurl);
/*
			$zoptions = array(
					CURLOPT_POST            => 1,
					CURLOPT_POSTFIELDS     	=> http_build_query(array('data' =>
						array('applicationId' => '6747968778427add008cc54d'))),
					CURLOPT_HTTPHEADER 		=> array("Content-Type: application/json")
//					CURLOPT_HTTPHEADER 		=> array("x-api-key"=> "sk_live_85i5UCgxfk_8UPG3wD0XZmjTTKF_sdlkUv00")

//curl --location --globoff --request POST 'https://[Insert subdomain from Studio account].readyplayer.me/api/users'
			);
			$zoptions = array(
//					CURLOPT_RETURNTRANSFER 	=> 1,
//					CURLOPT_HEADER         	=> 0,
//					CURLOPT_CONNECTTIMEOUT 	=> 20,
//					CURLOPT_TIMEOUT        	=> 20,
					CURLOPT_POST            => 1,
					CURLOPT_POSTFIELDS     	=> array("data.applicationId"=> "6747968778427add008cc54d"),
					CURLOPT_POSTFIELDS     	=> array("data.email"=> "adishno@walktheweb.com"),
					CURLOPT_POSTFIELDS     	=> array("data.id"=> "{{userId}}"),
					CURLOPT_POSTFIELDS     	=> array("data.authType"=> "code"),
//					CURLOPT_SSL_VERIFYHOST 	=> 0
			);
			//curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(array("data"=>array("email"=>"adishno@yahoo.com", "id"=>".", "authType"=>"code"))));
			curl_setopt_array($zgetfile, $zoptions);

*/
			/* Create Anonymous User */
			curl_setopt($zgetfile, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($zgetfile, CURLOPT_POST, 1);
//			CURLOPT_HTTPHEADER => array("x-api-key: sk_live_85i5UCgxfk_8UPG3wD0XZmjTTKF_sdlkUv00")
			curl_setopt($zgetfile, CURLOPT_POSTFIELDS, json_encode(
			array("data"=>
				array(
					"organizationId"=>"670995f9154c3cfe5bae5ad5",
					"glbUrl"=>"",
					"type"=>""
				)
			)));
			$headers = array();
			$headers[] = 'Content-Type: application/json';
			$headers[] = 'x-api-key: sk_live_85i5UCgxfk_8UPG3wD0XZmjTTKF_sdlkUv00';
			curl_setopt($zgetfile, CURLOPT_HTTPHEADER, $headers);

			$zdata = curl_exec($zgetfile);
			$curl_errno = curl_errno($zgetfile);
			$curl_error = curl_error($zgetfile);
			//echo $curl_errno;
			//echo $curl_error;

			curl_close($zgetfile);
/*
			$ztoken = '';
			$zid = '';
			$zarray = json_decode($zdata);
			if (isset($zarray->data->id)) {
				$zid = $zarray->data->id;
			}
			if (isset($zarray->data->token)) {
				$ztoken = $zarray->data->token;
			}
*/



//$wtwplugins->serror($zdata);
			$zresponse = array(
				'data'=> $zdata,
				'serror'=> ''
			);
		
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_functions.php-getListBaseModels=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}
}

	function wtwreadyplayerme_functions() {
		return wtwreadyplayerme_functions::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwreadyplayerme_functions'] = wtwreadyplayerme_functions();

?>
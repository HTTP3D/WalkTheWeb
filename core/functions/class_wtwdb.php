<?php
class wtwdb {
	/* main wtwdb class for WalkTheWeb database functions */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {
		if (defined('wtw_contentpath')) {
			$this->contentpath = wtw_contentpath;
		} else {
			$this->contentpath = wtw_rootpath."/content";
		}
	}	

	public function __call ($zmethod, $zarguments)  {
		if (isset($this->$zmethod)) {
			call_user_func_array($this->$zmethod, array_merge(array(&$this), $zarguments));
		}
	}
	
	/* declare public $wtwdb variables */
	public $userid = '';
	public $pagename = '';
	public $contentpath = '';
	
	public function serror($zmessage) {
		try {
			$this->query("
				insert into ".wtw_tableprefix."errorlog 
					(message,
					logdate)
					values
					('".addslashes($zmessage)."',
					'".date('Y-m-d H:i:s')."');");
				try {
					if ($this->hasValue($_SERVER['PHP_SELF'])) {
						$this->pagename = strtolower(basename($_SERVER['PHP_SELF']));
					} else {
						$this->pagename = "index.php";
					}
					if ($this->pagename == "admin.php") {
						$zerror = "<script type=\"text/javascript\">";
						$zerror .= "console.log('".addslashes($zmessage)."');";
						$zerror .= "if (document.getElementById('wtw_error') != null) {document.getElementById('wtw_error').innerHTML = '".addslashes($zmessage)."';";
						$zerror .= "WTW.openFullPageForm('error','Error Found');}";
						$zerror .= "</script>";
						echo $zerror;
					}
				} catch (Exception $e) { }
		} catch (Exception $e) {
		}
	}
	
	public function query($zsql) {
		$zdata = array();
		$znum_rows = 0;
		try {
			if ($this->hasValue($zsql)) {
				$conn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
				if ($conn->connect_error) {
					$this->serror("core-functons-class_wtwdb.php-query=".$conn->connect_error);
				} else {
					$zresults = $conn->query($zsql);
					if (is_object($zresults)) {
						if ($zresults->num_rows > 0) {
							while($zrow = $zresults->fetch_assoc()) {
								$zdata[$znum_rows] = $zrow;
								$znum_rows++;
							}
						}
					}
				}
				$conn->close();
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-query=".$e->getMessage());
		}	
		return $zdata;		
	}
	
	public function renameFieldIfExists($ztable, $zoldfield, $znewfield) {
		/* rename field in table - keeps the type and preserves all of the data in the column */
		try {
			/* check if table exists */
			if ($this->tableExists($ztable)) {
				$zresults = $this->query("SHOW COLUMNS FROM ".$ztable." LIKE '".$zoldfield."';");
				if (count($zresults) > 0) {
					$zresults = $this->query("
						describe `".$ztable."`");
					foreach ($zresults as $zrow) {
						$zfield = "";
						$ztype = "";
						$znull = "yes";
						$zprikey = "";
						$zdefault = "";
						$zextra = "";
						foreach ($zrow as $zkey=>$zvalue) { 
							switch (strtolower($zkey)) {
								case "field":
									$zfield = strtolower($zvalue);
									break;
								case "type":
									$ztype = strtolower($zvalue);
									break;
								case "null":
									$znull = strtolower($zvalue);
									break;
								case "key":
									$zprikey = strtolower($zvalue);
									break;
								case "default":
									$zdefault = strtolower($zvalue);
									break;
								case "extra":
									$zextra = strtolower($zvalue);
									break;
							}
						}
						
						if ($zfield == $zoldfield) {
							/* field changed, update field */
							$zsql = "alter table ".$ztable." change `".$zoldfield."` `".$znewfield."` ".$ztype;
							if ($znull == "no") {
								$zsql .= " not null";
							}
							if (isset($zdefault)) {
								if (strpos($zdefault,"null") !== false) {
									$zsql .= " default null";
								} else {
									$zsql .= " default '".$zdefault."'";
								}
							}
							if (!empty($zextra)) {
								$zsql .= " ".$zextra;
							}
							$zsql .= ";";
							$this->query($zsql);
						}
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-renameFieldIfExists=".$e->getMessage());
		}	
	}
			
	public function deltaCreateTable($zsql) {
		/* accepts a CREATE TABLE mysql statement and compares it to existing table (if it exists) and creates or updates the table schema */
		$zsql1 = '';
		try {
			$ztable = "";
			$zsql = str_replace("\n","",str_replace("\r","",$zsql));
			while (strpos($zsql,"  ") !== false) {
				$zsql = str_replace("  "," ",$zsql);
			}
			$zsqlsegments = explode("(",$zsql);
			foreach ($zsqlsegments as $zsqlpart) {
				if (strpos(strtolower($zsqlpart),"create table") !== false) {
					$zwords = explode(" ",strtolower(trim($zsqlpart)));
					foreach ($zwords as $zword) {
						if ($this->hasValue($zword) && $zword != "create" && $zword != "table" && empty($ztable)) {
							$ztable = str_replace("`","",$zword);
						}
					}
				}
			}
			$znewfields = array();
			$zprimarykey = "";
			$zuniquekey = "";
			$zuniquekeyname = "";
			$zindexkey = "";

			$zsqlfields = explode(",",strtolower(str_replace("`","",$zsql)));
			$zlastline = "";
			foreach ($zsqlfields as $zline) {
				if (strpos($zline,"create table") !== false && strpos($zline,"(") !== false) {
					$zlineparts = explode("(",$zline);
					if (!isset($zlineparts[2]) && isset($zlineparts[1])) {
						$zline = $zlineparts[1];
					} else {
						$zline = $zlineparts[1]."(".$zlineparts[2];
					}
				}
				if (strpos($zline,"decimal") !== false) {
					$zlastline = $zline;
				} else {
					if (!empty($zlastline)) {
						$zline = $zlastline.",".$zline;
					}
					$zlastline = "";
					$zline = trim(str_replace("  "," ",$zline));
					if (strpos($zline,"primary key") === false && strpos($zline,"unique key") === false) {
						$znewfield = "";
						$znewtype = "";
						$znewnull = "yes";
						$znewprikey = "";
						$znewdefault = "";
						$znewextra = "";
						$zwords = explode(" ",$zline);
						if ($this->hasValue($zwords[0])) {
							if ($zwords[0] != "key") {
								$znewfield = $zwords[0];
								$znewfield = str_replace(")","",$znewfield);
							}
						}
						if ($this->hasValue($zwords[1])) {
							$znewtype = $zwords[1];
						}
						if (strpos($zline,"not null") !== false) {
							$znewnull = "no";
						}
						if (strpos($zline," default ") !== false) {
							$zlineparts = explode(" default ",$zline);
							if ($this->hasValue($zlineparts[1])) {
								if (strpos($zlineparts[1],"'") !== false) {
									$zdefaults = explode("'",$zlineparts[1]);
									if (isset($zdefaults[1])) {
										$znewdefault = $zdefaults[1];
									}
								} else if (strpos($zlineparts[1]," ") !== false) {
									$zdefaults = explode(" ",$zlineparts[1]);
									if (isset($zdefaults[0])) {
										$znewdefault = $zdefaults[0];
									}
								} else {
									$znewdefault = $zlineparts[1];
								}
							}
						}
						if (strpos($zline,"auto_increment") !== false) {
							$znewextra = "auto_increment";
						}
						if (!empty($znewfield)) {
							$znewfields[count($znewfields)] = array(
								'field' => $znewfield,
								'type' => $znewtype,
								'null' => $znewnull,
								'prikey' => $znewprikey,
								'default' => $znewdefault,
								'extra' => $znewextra,
								'found' => '0'
							);
						}
					} else if (strpos($zline,"primary key") !== false) {
						$zprimarykey = str_replace(" ","",str_replace("(","",str_replace(")","",str_replace("primary key","",$zline))));
					} else if (strpos($zline,"unique key") !== false) {
						$zuniquekey = str_replace("unique key","",$zline);
						if (strpos($zuniquekey,")") !== false) {
							$zlineparts = explode(")",$zuniquekey);
							$zuniquekey = trim($zlineparts[0]).")";
						} else {
							$zuniquekey = "";
						}
						if (strpos($zuniquekey,"(") !== false) {
							$zlineparts = explode("(",$zuniquekey);
							$zuniquekeyname = trim($zlineparts[0]);
						} else {
							$zuniquekeyname = trim($zuniquekey);
						}
					}
				}
			}
			if (strpos($zsql,"key ") !== false) {
				$zsqlparts = explode(")",strtolower($zsql));
				foreach ($zsqlparts as $zline) {
					if (strpos($zline,"key ") !== false && strpos($zline,"primary key ") === false && strpos($zline,"unique key ") === false) {
						$zlineparts = explode("key ",$zline);
						$zindexkey = $zlineparts[1].")";
					}
				}
			}
			/* check if table already exists */
			if ($this->tableExists($ztable)) {
				$znewprimarysql = "";
				$znewuniquesql = "";
				$znewindexsql = "";
				/* look up existing table schema and check fields, update or insert where necessary */
				$zresults = $this->query("
					describe `".$ztable."`");
				foreach ($zresults as $zrow) {
					$zfield = "";
					$ztype = "";
					$znull = "yes";
					$zprikey = "";
					$zdefault = "";
					$zextra = "";
					foreach ($zrow as $zkey=>$zvalue) { 
						switch (strtolower($zkey)) {
							case "field":
								$zfield = strtolower($zvalue);
								break;
							case "type":
								$ztype = strtolower($zvalue);
								break;
							case "null":
								$znull = strtolower($zvalue);
								break;
							case "key":
								$zprikey = strtolower($zvalue);
								break;
							case "default":
								$zdefault = strtolower($zvalue);
								break;
							case "extra":
								$zextra = strtolower($zvalue);
								break;
						}
					}
					$zfoundfield = false;
					for ($i=0; $i < count($znewfields); $i++) {
						if ($znewfields[$i] != null) {
							if ($znewfields[$i]["field"] == $zfield) {
								$zfoundfield = true;
								$znewfields[$i]["found"] = '1';
							}
						}
					}
					if ($zfoundfield == false) {
						/* field no longer in use, consider deleting field... not sure if I want to automate this...in case some developers use it in their code */
					}
				}
				/* update records */
				for ($i=0; $i < count($znewfields); $i++) {
					if ($znewfields[$i] != null) {
						if ($znewfields[$i]["found"] == '0') {
							/* insert new field */
							$zsql = "alter table ".$ztable." add column `".$znewfields[$i]["field"]."` ".$znewfields[$i]["type"];
							if ($znewfields[$i]["null"] == "no") {
								$zsql .= " not null";
							}
							if (isset($znewfields[$i]["default"])) {
								if (strpos($znewfields[$i]["default"],"null") !== false) {
									$zsql .= " default null";
								} else if (strpos($znewfields[$i]["type"] ,'text') === false && strpos($znewfields[$i]["type"] ,'blob') === false) {
									$zsql .= " default '".$znewfields[$i]["default"]."'";
								}
							}
							if (!empty($znewfields[$i]["extra"])) {
								$zsql .= " ".$znewfields[$i]["extra"];
							}
							if ($i > 0) {
								$zsql .= " AFTER `".$znewfields[$i-1]["field"]."` ";
							} else {
								$zsql .= " FIRST ";
							}
							$zsql .= ";";

							if (strpos($zsql, 'engine=innodb') === false && strpos($zsql, 'auto_increment') === false) {
								/* update if it is not an auto increment type and is a valid fieldname to update */
								$zsql1 = $zsql;
								$this->query($zsql);
							}
						} else {
							if ($znewfields[$i]["field"] == $zprimarykey) {
								$znewfields[$i]["prikey"] = "pri";
							}
							if ($znewfields[$i]["prikey"] != $zprikey) {
								$this->query("alter table ".$ztable." drop primary key;");

								$znewprimarysql = "alter table ".$ztable." add primary key (".$zprimarykey.");";
								if (empty($znewfields[$i]["prikey"]) && !empty($zprikey)) {
									$znewuniquesql = "alter table ".$ztable." add unique ".$zuniquekey.";";
									if (!empty($zindexkey)) {
										$znewindexsql = "alter table ".$ztable." add index ".$zindexkey.";";
									}
								}
							}
							/* field changed, update field */
							$zsql = "alter table ".$ztable." modify column `".$znewfields[$i]["field"]."` ".$znewfields[$i]["type"];
							if ($znewfields[$i]["null"] == "no") {
								$zsql .= " not null";
							}
							if (isset($znewfields[$i]["default"])) {
								if (strpos($znewfields[$i]["default"],"null") !== false) {
									$zsql .= " default null";
								} else if (strpos($znewfields[$i]["type"] ,'text') === false && strpos($znewfields[$i]["type"] ,'blob') === false) {
									$zsql .= " default '".$znewfields[$i]["default"]."'";
								}
							}
							if (!empty($znewfields[$i]["extra"])) {
								$zsql .= " ".$znewfields[$i]["extra"];
							}
							if ($i > 0) {
								$zsql .= " AFTER `".$znewfields[$i-1]["field"]."` ";
							} else {
								$zsql .= " FIRST ";
							}
							$zsql .= ";";
							if (strpos($zsql, 'auto_increment') === false) {
								/* update if it is not an auto increment type */
								$zsql1 = $zsql;
								$this->query($zsql);
							}
						}
					}
				}
				
				if (!empty($znewprimarysql)) {
					$this->query($znewprimarysql);
				}
				if (!empty($znewuniquesql) || !empty($znewindexsql)) {
					$zresults = $this->query("show index from ".$ztable.";");
					foreach ($zresults as $zrow) {
						$this->query("
							alter table ".$ztable." 
							drop index ".$zrow["Key_name"].";");
					}
					if (!empty($znewuniquesql)) {
						$this->query($znewuniquesql);
					}
					if (!empty($znewindexsql)) {
						$this->query($znewindexsql);
					}
				}
			} else {
				/* execute create statement */
				$this->query($zsql);
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-deltaCreateTable=".$e->getMessage()." - ".$zsql1);
		}	
	}
	
	public function checkContentFolders($zcommunityid, $zbuildingid, $zthingid, $zavatarid) {
		/* checks and adds content folders as needed for use with uploaded files */
		try {
			$this->verifyFolderExists($this->contentpath."/uploads");
			$this->verifyFolderExists($this->contentpath."/uploads/users");
			$this->verifyFolderExists($this->contentpath."/uploads/communities");
			$this->verifyFolderExists($this->contentpath."/uploads/buildings");
			$this->verifyFolderExists($this->contentpath."/uploads/things");
			$this->verifyFolderExists($this->contentpath."/uploads/avatars");
			$this->verifyFolderExists($this->contentpath."/uploads/useravatars");
			if ($this->hasValue($zcommunityid)) {
				$this->verifyFolderExists($this->contentpath."/uploads/communities/".$zcommunityid);
				$this->verifyFolderExists($this->contentpath."/uploads/communities/".$zcommunityid."/media");
				$this->verifyFolderExists($this->contentpath."/uploads/communities/".$zcommunityid."/snapshots");
			}
			if ($this->hasValue($zbuildingid)) {
				$this->verifyFolderExists($this->contentpath."/uploads/buildings/".$zbuildingid);
				$this->verifyFolderExists($this->contentpath."/uploads/buildings/".$zbuildingid."/media");
				$this->verifyFolderExists($this->contentpath."/uploads/buildings/".$zbuildingid."/snapshots");
			}
			if ($this->hasValue($zthingid)) {
				$this->verifyFolderExists($this->contentpath."/uploads/things/".$zthingid);
				$this->verifyFolderExists($this->contentpath."/uploads/things/".$zthingid."/media");
				$this->verifyFolderExists($this->contentpath."/uploads/things/".$zthingid."/snapshots");
			}
			if ($this->hasValue($zavatarid)) {
				$this->verifyFolderExists($this->contentpath."/uploads/avatars/".$zavatarid);
				$this->verifyFolderExists($this->contentpath."/uploads/avatars/".$zavatarid."/textures");
				$this->verifyFolderExists($this->contentpath."/uploads/avatars/".$zavatarid."/animations");
				$this->verifyFolderExists($this->contentpath."/uploads/avatars/".$zavatarid."/snapshots");
			}
			if ($this->hasValue($_SESSION['wtw_uploadpathid'])) {
				$syear = date('Y');
				$smonth = date('m');
				$this->verifyFolderExists($this->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']);
				$this->verifyFolderExists($this->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$syear);
				$this->verifyFolderExists($this->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/".$syear."/".$smonth);
				$this->verifyFolderExists($this->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/objects");
				$this->verifyFolderExists($this->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/media");
				$this->verifyFolderExists($this->contentpath."/uploads/users/".$_SESSION['wtw_uploadpathid']."/snapshots");
				$this->verifyFolderExists($this->contentpath."/uploads/feedback");
				$this->verifyFolderExists($this->contentpath."/uploads/feedback/snapshots");
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkContentFolders=".$e->getMessage());
		}
	}

	public function copyContentSubFolderRecursive($zsourcefolder, $zdestinationfolder) { 
		/* copy folder recursively under contents to another folder under contents - and set permissions */
		try {
			if (strpos($zsourcefolder, $this->contentpath) !== false && strpos($zdestinationfolder, $this->contentpath) !== false) {
				$zfolder = opendir($zsourcefolder);
				$this->verifyFolderExists($zdestinationfolder);
				while(false !== ($zfile = readdir($zfolder))) {
					if (($zfile != '.') && ($zfile != '..')) {
						if (is_dir($zsourcefolder.'/'.$zfile)) {
							$this->copyContentSubFolderRecursive($zsourcefolder.'/'.$zfile, $zdestinationfolder.'/'.$zfile);
						}
						else {
							copy($zsourcefolder.'/'.$zfile, $zdestinationfolder.'/'.$zfile);
							umask(0);
							chmod($zdestinationfolder.'/'.$zfile, octdec(wtw_chmod));
							if (defined('wtw_umask')) {
								/* reset umask */
								if (wtw_umask != '0') {
									umask(octdec(wtw_umask));
								}
							}
						}
					}
				} 
				closedir($zfolder);
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkContentFolders=".$e->getMessage());
		}
	}

	public function getAvatarFilesList($zfiles, $zdir) {
		try {
			$i = 0;
			$zdir = rtrim($zdir, "/");
			if (is_dir($zdir)) {
				if ($zdirectory = opendir($zdir)) {
					while (($zfile = readdir($zdirectory)) !== false) {
						if ($zfile != '.' && $zfile != '..') {
							if (is_dir($zdir.'/'.$zfile)) {
								if ($zdirectory2 = opendir($zdir.'/'.$zfile)) {
									while (($zfile2 = readdir($zdirectory2)) !== false) {
										if ($zfile2 != '.' && $zfile2 != '..') {
											if ($this->endsWith($zfile2, '.babylon') || $this->endsWith($zfile2, '.manifest') || $this->endsWith($zfile2, '.blend') || $this->endsWith($zfile2, '.blend1') || $this->endsWith($zfile2, '.log') || $this->endsWith($zfile2, '.jpg') || $this->endsWith($zfile2, '.gif') || $this->endsWith($zfile2, '.png') || $this->endsWith($zfile2, '.jpeg') || $this->endsWith($zfile2, '.obj') || $this->endsWith($zfile2, '.gtlf') || $this->endsWith($zfile2, '.glb')) {
												$zfiles[$i] = array(
													'file'=> $zfile.'/'.$zfile2
												);
												$i += 1;
											}
										}
									}
									closedir($zdirectory2);
								}
							} else {
								if ($this->endsWith($zfile, '.babylon') || $this->endsWith($zfile, '.manifest') || $this->endsWith($zfile, '.blend') || $this->endsWith($zfile, '.blend1') || $this->endsWith($zfile, '.log') || $this->endsWith($zfile, '.jpg') || $this->endsWith($zfile, '.gif') || $this->endsWith($zfile, '.png') || $this->endsWith($zfile, '.jpeg') || $this->endsWith($zfile, '.obj') || $this->endsWith($zfile, '.gtlf') || $this->endsWith($zfile, '.glb')) {
									$zfiles[$i] = array(
										'file'=> $zfile
									);
									$i += 1;
								}
							}
						}
					}
					closedir($zdirectory);
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getAvatarFilesList=".$e->getMessage());
		}
		return $zfiles;
	}

	public function getFilefromURL($zfromurl, $zfilepath, $zfilename) {
		/* save file using any available method fopen, curl, or ftp (added soon) */
		$zsuccess = true;
		try {
			$zfromurl = str_replace(' ', '%20', $zfromurl);
			if (ini_get('allow_url_fopen') ) {
				$zdata1 = file_get_contents($zfromurl);
				$zsuccess2 = file_put_contents($zfilepath.$zfilename, $zdata1);	
				/* zsuccess will be the number of bytes or false on fail */
				if ($zsuccess2 == false) {
					$zsuccess = false;
				}
			} else if (extension_loaded('curl')) {
				$zgetfile = curl_init($zfromurl);
				$zopenfile = fopen($zfilepath.$zfilename, 'wb');
				curl_setopt($zgetfile, CURLOPT_FILE, $zopenfile);
				curl_setopt($zgetfile, CURLOPT_HEADER, 0);
				curl_exec($zgetfile);
				curl_close($zgetfile);
				fclose($zopenfile);
			}
			umask(0);
			chmod($zfilepath.$zfilename, octdec(wtw_chmod));
			if (defined('wtw_umask')) {
				/* reset umask */
				if (wtw_umask != '0') {
					umask(octdec(wtw_umask));
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getFilefromURL=".$e->getMessage());
			$zsuccess = false;
		}
		return $zsuccess;
	}
	
	public function openFilefromURL($zfromurl, $zuseincludepath=false, $zcontext=null) {
		/* open file using any available method fopen, curl, or ftp (added soon) */
		$zresponse = null;
		try {
			$zfromurl = str_replace(' ', '%20', $zfromurl);
			if (ini_get('allow_url_fopen') ) {
				$zresponse = file_get_contents($zfromurl, $zuseincludepath, $zcontext);
			} else if (extension_loaded('curl')) {
				$zresponse = curl_init($zfromurl);
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-openFilefromURL=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function getRandomString($zlength, $zstringtype) {
		$zrandomstring = '';
		try {
			$zcharacters = '';
			switch ($zstringtype) {
				case 2:
					$zcharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
					break;
				case 3:
					$zcharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%^&*()_+=-';
					break;
				default:
					$zcharacters = '0123456789abcdefghijklmnopqrstuvwxyz';
					break;
			}
			for ($i = 0; $i < $zlength; $i++) {
				$zrandomstring .= $zcharacters[rand(0, strlen($zcharacters) - 1)];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getRandomString=".$e->getMessage());
		}
		return $zrandomstring;
	}

	public function tableExists($ztablename) {
		$zexists = false;
		try {
			$zresults = $this->query("show tables like '".$ztablename."';");
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-tableExists=".$e->getMessage());
		}			
		return $zexists;
	}

	public function keyExists($ztablename, $zfieldid, $zkeyid) {
		$zexists = false;
		try {
			$zresults = $this->query("
				select ".$zfieldid." 
				from ".wtw_tableprefix.$ztablename." 
				where ".$zfieldid."=".$zkeyid.";");
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-keyExists=".$e->getMessage());
		}			
		return $zexists;
	}
	
	public function verifyFolderExists($zfolder) {
		/* verify if folder exists, create if not */
		$zexists = false;
		try {
			if (!file_exists($zfolder)) {
				umask(0);
				mkdir($zfolder, octdec(wtw_chmod), true);
				chmod($zfolder, octdec(wtw_chmod));
				if (defined('wtw_umask')) {
					/* reset umask */
					if (wtw_umask != '0') {
						umask(octdec(wtw_umask));
					}
				}
				$zexists = true;
			} else {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->$serrorText = "core-functions-class_wtwdb.php-verifyFolderExists=" . $e->getMessage();
		}
		return $zexists;
	}	

	public function getNewKey($ztablename, $zfieldid, $zdefaultkeyid) {
		/* pass the tablename without prefix, id field name, and (optional) if you want a starting test value */
		$zkeyid = '';
		try {
			/* check for default and make sure default is not New From Scratch or versions will not work */
			if (!isset($zdefaultkeyid) || empty($zdefaultkeyid) || ($ztablename == 'communities' && $zdefaultkeyid == '0000000000000000') || ($ztablename == 'buildings' && $zdefaultkeyid == '1111111111111111') || ($ztablename == 'things' && $zdefaultkeyid == '2222222222222222')) {
				$zdefaultkeyid = $this->getRandomString(16,1);
			}
			while (empty($zkeyid)) {
				$zresults = $this->query("
					select ".$zfieldid." 
					from ".wtw_tableprefix.$ztablename." 
					where ".$zfieldid."='".$zdefaultkeyid."';");
				if (count($zresults) == 0) {
					$zkeyid = $zdefaultkeyid;
				} else if ($ztablename == 'users') {
					$zkeyid = $zdefaultkeyid;
				} else {
					$zkeyid = $this->getRandomString(16,1);
					while ($this->keyExists($ztablename, $zfieldid, $zkeyid)) {
						$zkeyid = $this->getRandomString(16,1);
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getNewKey=".$e->getMessage());
		}			
		return $zkeyid;
	}

	public function startsWith($zhaystack, $zneedle) {
		try {
			return substr_compare(strtolower($zhaystack), strtolower($zneedle), 0, strlen($zneedle)) === 0;
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-startsWith=".$e->getMessage());
		}			
	}
	
	public function endsWith($zhaystack, $zneedle) {
		try {
			return substr_compare(strtolower($zhaystack), strtolower($zneedle), -strlen($zneedle)) === 0;
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-endsWith=".$e->getMessage());
		}			
	}
	
	public function getIDByPastID($ztablename, $zfieldid, $zpastfieldid, $zpastid) {
		$zkeyid = '';
		try {
			if ($this->hasValue($zpastid)) {
				$zresults = $this->query("
					select ".$zfieldid." 
					from ".wtw_tableprefix.$ztablename." 
					where ".$zpastfieldid."='".$zpastid."'
					order by updatedate desc
					limit 1;");
				foreach ($zresults as $zrow) {
					$zkeyid = $zrow[$zfieldid];
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getIDByPastID=".$e->getMessage());
		}
		return $zkeyid;
	}
	
	public function getUserIDfromPastID($zpastid) {
		$zkeyid = '';
		try {
			if ($this->hasValue($zpastid)) {
				$zresults = $this->query("
					select userid 
					from ".wtw_tableprefix."users 
					where pastuserid='".$zpastid."'
						or (userid='".$zpastid."' and pastuserid='')
					order by updatedate desc
					limit 1;");
				foreach ($zresults as $zrow) {
					$zkeyid = $zrow["userid"];
				}
			}
			if (empty($zkeyid)) {
				$zkeyid = $zpastid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getUserIDfromPastID=".$e->getMessage());
		}
		return $zkeyid;
	}
	
	public function tableFieldExists($ztable, $zfield) {
		$zexists = false;
		try {
			$zresults = $this->query("
				show columns
				from ".wtw_tableprefix.$ztable." 
				like '".$zfield."';");
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-tableFieldExists=".$e->getMessage());
		}			
		return $zexists;
	}
	
	public function userExists($zuserid) {
		$zexists = false;
		try {
			$zresults = $this->query("
				select userid 
				from ".wtw_tableprefix."users 
				where userid='".$zuserid."';");
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-userExists=".$e->getMessage());
		}			
		return $zexists;
	}
	
	public function getSessionUserID() {
		$zuserid = "";
		try {
			if ($this->hasValue($_SESSION["wtw_userid"])) {
				$this->userid = $_SESSION["wtw_userid"];
				$zuserid = $_SESSION["wtw_userid"];
			} else {
				$this->userid = "";
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getSessionUserID=" . $e->getMessage());
		}
		return $zuserid;
	}
	
	public function isUserInRole($zrole) {
		$zsuccess = false;
		try {
			$zuserid = $this->getSessionUserID();
			$zresults = $this->query("
				select ur1.userinroleid 
				from ".wtw_tableprefix."usersinroles ur1
					inner join ".wtw_tableprefix."roles r1
					on ur1.roleid=r1.roleid
					inner join ".wtw_tableprefix."users u1
					on ur1.userid=u1.userid
				where lower(r1.rolename)=lower('".$zrole."')
					and u1.userid='".$zuserid."'
					and r1.deleted=0
					and ur1.deleted=0
					and u1.deleted=0;");
			foreach ($zresults as $zrow) {
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-isUserInRole=" . $e->getMessage());
		}
		return $zsuccess;
	}
	
	public function getUserRoles($zuserid = '') {
		$zroles = array();
		try {
			/* defaults to current user unless called with admin role access */
			if ($this->isUserInRole("admin")) {
				if (!isset($zuserid) || empty($zuserid)) {
					$zuserid = $this->getSessionUserID();
				}
			} else {
				$zuserid = $this->getSessionUserID();
			}
			if (!empty($this->getSessionUserID())) {
				$zresults = $this->query("
					select ur1.userinroleid,
						r1.roleid,
						r1.rolename
					from ".wtw_tableprefix."usersinroles ur1
						inner join ".wtw_tableprefix."roles r1
						on ur1.roleid=r1.roleid
						inner join ".wtw_tableprefix."users u1
						on ur1.userid=u1.userid
					where ur1.userid='".$zuserid."'
						and r1.deleted=0
						and ur1.deleted=0
						and u1.deleted=0
					order by r1.rolename, ur1.userinroleid;");
				foreach ($zresults as $zrow) {
					$zroles[] = array(
						'userinroleid' => $zrow["userinroleid"],
						'roleid' => $zrow["roleid"],
						'rolename' => $zrow["rolename"]);
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getUserRoles=" . $e->getMessage());
		}
		return $zroles;
	}

	public function hasPermission($zaccessrequired) {
		/* array of access required will be compared to array of current user roles */
		$zhaspermission = false;
		try {
			$zuserroles = $this->getUserRoles();
			if (!isset($zaccessrequired) || empty($zaccessrequired)) {
				/* null allows all */
				$zhaspermission = true;
			} else if ($this->hasValue($zuserroles)) {
				foreach ($zuserroles as $zrole) {
					foreach ($zaccessrequired as $zaccessrolename) {
						$zrolename = $zrole["rolename"];
						if (strtolower($zrolename) == strtolower($zaccessrolename)) {
							$zhaspermission = true;
						}
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-hasPermission=" . $e->getMessage());
		}
		return $zhaspermission;
	}

	public function checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid) {
		$zhasaccess = false;
		try {
			global $wtwuser;
			$zresults = null;
			if ($this->hasValue($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
				if ($this->userExists($zuserid)) {
					global $wtwuser;
					$this->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
			if ($this->hasValue($zcommunityid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where communityid='".$zcommunityid."'
						and userid='".$wtwuser->userid."'
						and (lower(useraccess)='admin'
						or lower(useraccess)='architect'
						or lower(useraccess)='graphics artist'
						or lower(useraccess)='developer')
					limit 1");
				foreach ($zresults as $zrow) {
					$zauthorizationid = $zrow["userauthorizationid"];
					if ($this->hasValue($zauthorizationid)) {
						$zhasaccess = true;
					}
				}
			}
			if ($this->hasValue($zbuildingid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where buildingid='".$zbuildingid."'
						and userid='".$wtwuser->userid."'
						and (lower(useraccess)='admin'
						or lower(useraccess)='architect'
						or lower(useraccess)='graphics artist'
						or lower(useraccess)='developer')
					limit 1");
				foreach ($zresults as $zrow) {
					$zauthorizationid = $zrow["userauthorizationid"];
					if ($this->hasValue($zauthorizationid)) {
						$zhasaccess = true;
					}
				}
			}
			if ($this->hasValue($zthingid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where thingid='".$zthingid."'
						and userid='".$wtwuser->userid."'
						and (lower(useraccess)='admin'
						or lower(useraccess)='architect'
						or lower(useraccess)='graphics artist'
						or lower(useraccess)='developer')
					limit 1");
				foreach ($zresults as $zrow) {
					$zauthorizationid = $zrow["userauthorizationid"];
					if ($this->hasValue($zauthorizationid)) {
						$zhasaccess = true;
					}
				}
			}
			if ($zhasaccess == false) {
				if ($this->isUserInRole('Admin') || $this->isUserInRole('Developer')) {
					$zhasaccess = true;
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwbuildings.php-checkUpdateAccess=".$e->getMessage());
		}
		return $zhasaccess;
	}

	public function checkAdminAccess($zcommunityid, $zbuildingid, $zthingid) {
		$zhasaccess = false;
		try {
			global $wtwuser;
			if ($this->hasValue($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
				if ($this->userExists($zuserid)) {
					global $wtwuser;
					$this->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
			if ($this->hasValue($zcommunityid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where communityid='".$zcommunityid."'
						and userid='".$wtwuser->userid."'
						and lower(useraccess)='admin'
					limit 1");
				foreach ($zresults as $zrow) {
					$zauthorizationid = $zrow["userauthorizationid"];
					if ($this->hasValue($zauthorizationid)) {
						$zhasaccess = true;
					}
				}
			}
			if ($this->hasValue($zbuildingid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where buildingid='".$zbuildingid."'
						and userid='".$wtwuser->userid."'
						and lower(useraccess)='admin'
					limit 1");
				foreach ($zresults as $zrow) {
					$zauthorizationid = $zrow["userauthorizationid"];
					if ($this->hasValue($zauthorizationid)) {
						$zhasaccess = true;
					}
				}
			}
			if ($this->hasValue($zthingid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where thingid='".$zthingid."'
						and userid='".$wtwuser->userid."'
						and lower(useraccess)='admin'
					limit 1");
				foreach ($zresults as $zrow) {
					$zauthorizationid = $zrow["userauthorizationid"];
					if ($this->hasValue($zauthorizationid)) {
						$zhasaccess = true;
					}
				}
			}
			if ($zhasaccess == false) {
				if ($this->isUserInRole('Admin') || $this->isUserInRole('Developer')) {
					$zhasaccess = true;
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwbuildings.php-checkAdminAccess=".$e->getMessage());
		}
		return $zhasaccess;
	}
	
	public function getRatingText($zrating) {
		$zratingtext = "Not Rated";
		try {
			switch ($zrating) {
				case "Web-All":
					$zratingtext = "All Visitors - Safe for All Ages.";
					break;
				case "Web-P":
					$zratingtext = "Parental Oversight - Adult supervision suggested for Children.";
					break;
				case "Web-P13":
					$zratingtext = "Parental Caution for Children - Not recommended for Children under 13 Years Old.";
					break;
				case "Web-P17":
					$zratingtext = "Parental Oversight for Visitors - Adult supervision recommended for Visitors under 18 Years Old, not recommended for Children under 13 Years Old.";
					break;
				case "Web-Adult":
					$zratingtext = "Adult - Visitors must be at least 18 Years Old.";
					break;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getRatingText=".$e->getMessage());
		}			
		return $zratingtext;
	}
	
	public function getSetting($zsettingname, $zdefaultvalue = null) {
		$zsettingvalue = $zdefaultvalue;
		try {
			$zresults = $this->query("
				select * 
				from ".wtw_tableprefix."settings 
				where settingname='".$zsettingname."'
					and deleted=0;");
			foreach ($zresults as $zrow) {
				$zsettingvalue = $zrow["settingvalue"];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getSetting=".$e->getMessage());
		}			
		return $zsettingvalue;
	}

	public function saveSetting($zsettingname, $zsettingvalue) {
		$zsuccess = true;
		try {
			$zsettingid = 0;
			$zresults = $this->query("
				select * 
				from ".wtw_tableprefix."settings 
				where settingname='".$zsettingname."';");
			foreach ($zresults as $zrow) {
				$zsettingid = $zrow["settingid"];
			}
			if ($this->hasValue($zsettingid)) {
				$this->query("
					update ".wtw_tableprefix."settings 
					set settingvalue='".$zsettingvalue."',
						updatedate=now(),
						updateuserid='".$this->userid."',
						deleteddate=null,
						deleteduserid='',
						deleted=0
					where settingid=".$zsettingid.";");
			} else {
				$this->query("
					insert into ".wtw_tableprefix."settings 
						(settingname,
						 settingvalue,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
						values
						('".$zsettingname."',
						 '".$zsettingvalue."',
						 now(),
						 '".$this->userid."',
						 now(),
						 '".$this->userid."');");
			}
		} catch (Exception $e) {
			$zsuccess = false;
			$this->serror("core-functions-class_wtwdb.php-saveSetting=".$e->getMessage());
		}			
		return $zsuccess;
	}

	public function getSettings($zsettingnames) {
		$zsettingvalues = array();
		try {
			if (!is_array($zsettingnames) && !is_object($zsettingnames)) {
				if (strpos($zsettingnames, ',')) {
					$zsettingnames = explode(',', $zsettingnames);
					
				} else {
					$zsettingnames[0] = $zsettingnames;
				}
			}
			foreach ($zsettingnames as $zsettingname) {
				$zsettingname = trim($zsettingname);
				if (isset($zsettingname)) {
					$zresults = $this->query("
						select * 
						from ".wtw_tableprefix."settings 
						where settingname='".$zsettingname."'
							and deleted=0;");
					if (count($zresults) > 0) {
						foreach ($zresults as $zrow) {
							$zsettingvalues[$zsettingname] = $zrow["settingvalue"];
						}
					} else {
						$zsettingvalues[$zsettingname] = '';
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getSettings=".$e->getMessage());
		}			
		return $zsettingvalues;
	}
	
	public function saveSettings($zsettings) {
		$zsuccess = true;
		try {
			if ($this->hasValue($zsettings)) {
				$zsettings = json_decode($zsettings);
				foreach ($zsettings as $zsettingname=>$zsettingvalue) {
					$zsuccess1 = $this->saveSetting($zsettingname, $zsettingvalue);
					if ($zsuccess1 == false) {
						$zsuccess = false;
					}
				}
			} else {
				$zsuccess = false;
			}
		} catch (Exception $e) {
			$zsuccess = false;
			$this->serror("core-functions-class_wtwdb.php-saveSettings=".$e->getMessage());
		}			
		return $zsuccess;
	}
	
	public function decode64($ztext) {
		/* attempt to base64_decode the text, if not, return blank */
		try {
			if ($this->hasValue($ztext)) {
				$ztext = base64_decode($ztext);
			} else {
				$ztext = '';
			}
		} catch (Exception $e) {
			$ztext = '';
		}			
		return $ztext;
	}
	
	public function getPost($zfield, $zdefault) {
		/* get the posed data with a fall back default value */
		$zvalue = $zdefault;
		try {
			if (isset($_POST[$zfield])) {
				$zvalue = $_POST[$zfield];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getPost=".$e->getMessage());
		}
		return $zvalue;
	}

	public function getFiles($zfield, $zdefault) {
		/* get the posed file data with a fall back default value */
		$zvalue = $zdefault;
		try {
			if (isset($_FILES[$zfield])) {
				$zvalue = $_FILES[$zfield];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getFiles=".$e->getMessage());
		}
		return $zvalue;
	}

	public function getVal($zkey, $zdefaultval) {
		$zvalue = $zdefaultval;
		try {
			if (isset($_GET[$zkey])) {
				$zvalue = $_GET[$zkey];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getval=".$e->getMessage());
		}
		return $zvalue;
	}

	public function getNumber($zkey, $zdefaultval) {
		$zvalue = $zdefaultval;
		try {
			if (isset($_GET[$zkey])) {
				if (is_numeric($_GET[$zkey])) {
					$zvalue = $_GET[$zkey];
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getNumber=".$e->getMessage());
		}
		return $zvalue;
	}

	public function checkValue($zvalue, $zdefaultval = null) {
		try {
			if (!isset($zvalue) || empty($zvalue)) {
				if (!isset($zdefaultval)) {
					$zvalue = false;
				} else {
					$zvalue = $zdefaultval;
				}
			} else if (!isset($zdefaultval)) {
				$zvalue = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkValue=".$e->getMessage());
		}
		return $zvalue;
	}

	public function hasValue(&$zvalue) {
		$zresponse = false;
		try {
			if (isset($zvalue) && !empty($zvalue)) {
				$zresponse = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-hasValue=".$e->getMessage());
		}
		return $zresponse;
	}

	public function checkIDFormat($zid) {
		$zvalidid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9]/', $zid) == false) {
				$zid = "";
			}
			if (strlen($zid) == 16) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkIDFormat=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkNumber($zval, $zdefaultval) {
		$zcheckval = $zdefaultval;
		try {
			if (isset($zval)) {
				$zval = str_replace(",","",str_replace(" ","",str_replace("$","", $zval)));
				if (is_numeric($zval)) {
					$zcheckval = $zval;
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkNumber=".$e->getMessage());
		}
		return $zcheckval;
	}

	public function getMaximumFileUploadSize() {  
		return min($this->convertPHPSizeToBytes(ini_get('post_max_size')), $this->convertPHPSizeToBytes(ini_get('upload_max_filesize')));  
	}  

	public function convertPHPSizeToBytes($zsize) {
		$zvalue = 0;
		try {
			$zsuffix = strtoupper(substr($zsize, -1));
			if (!in_array($zsuffix,array('P','T','G','M','K'))){
				return (int)$zsize;  
			} 
			$zvalue = substr($zsize, 0, -1);
			switch ($zsuffix) {
				case 'P':
					$zvalue *= 1024 * 1024 * 1024 * 1024 * 1024;
					break;
				case 'T':
					$zvalue *= 1024 * 1024 * 1024 * 1024;
					break;
				case 'G':
					$zvalue *= 1024 * 1024 * 1024;
					break;
				case 'M':
					$zvalue *= 1024 * 1024;
					break;
				case 'K':
					$zvalue *= 1024;
					break;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-convertPHPSizeToBytes=".$e->getMessage());
		}			
		return $zvalue;
	}      
	
	public function checkAlphaNumeric($zid) {
		$zvalidid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9_-]/', $zid)) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkAlphaNumeric=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkDisplayName($zid, $zdefault) {
		$zvalidid = $zdefault;
		try {
			$zid = str_replace(" ","",addslashes($zid));
			if (preg_match('/[a-zA-Z0-9_-]/', $zid)) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkDisplayName=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkFolderPath($zurl) {
		$zvalidurl = "";
		try {
			if (preg_match('/[a-zA-Z0-9_.-\/\:]/', $zurl)) {
				$zvalidurl = $zurl;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkFolderPath=".$e->getMessage());
		}			
		return $zvalidurl;
	}

	public function checkFileName($zid) {
		$zvalidid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9_.-]/', $zid)) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkFileName=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkFunctionName($zid) {
		$zvalidid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9_.]/', $zid)) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkFunctionName=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkPublishName($zdomainname, $zwebtype, $zpublishname) {
		$zexists = false;
		try {
			$zsql = "
				select webaliasid
				from ".wtw_tableprefix."webaliases
				where domainname='".$zdomainname."'
					and deleted=0 ";
			switch ($zwebtype) {
				case "community":
					$zsql .= " and (communitypublishname='".$zpublishname."' or communityid='".$zpublishname."') ";
					break;
				case "building":
					$zsql .= " and (buildingpublishname='".$zpublishname."' or buildingid='".$zpublishname."') ";
					break;
				case "thing":
					$zsql .= " and (thingpublishname='".$zpublishname."' or thingid='".$zpublishname."') ";
					break;
			}
			$zsql .=	"order by createdate limit 1;";
			$zresults = $this->query($zsql);
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkPublishName=".$e->getMessage());
		}			
		return $zexists;
	}

	public function prepCheckDate($zdate) {
		/* returns either 'dateformatted' or NULL - ready to be used in SQL */
		$zdatestring = "";
		try {
			$zdatepart  = explode('/', $zdate);
			if (count($zdatepart) == 3) {
				if (checkdate($zdatepart[0], $zdatepart[1], $zdatepart[2])) {
					$zdatestring = "'".$zdatepart[2]."-".$zdatepart[1]."-".$zdatepart[0]."'";
				}
			} else {
				$zformat = 'Y-m-d H:i:s';
				$zvaliddate = DateTime::createFromFormat($zformat, $zdate);
				if ($zvaliddate && $zvaliddate->format($zformat) == $zdate) {
					$zdatestring = "'".$zvaliddate."'";
				}
			}
			if (empty($zdatestring)) {
				$zdatestring = "null";
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-prepCheckDate=".$e->getMessage());
		}			
		return $zdatestring;
	}

	public function formatDate($zdate) {
		/* returns mm/dd/yyyy */
		$zdatestring = "";
		try {
			if ($this->hasValue($zdate)) {
				$zformat = 'm/d/Y';
				$zdate = date_create($zdate);
				$zdatestring = date_format($zdate,$zformat);
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-formatDate=".$e->getMessage());
		}			
		return $zdatestring;
	}
	
	public function formatMoney($znumber) {
		/* returns $##,###.## format */
		$zmoneystring = "";
		try {
			if ($this->hasValue($znumber)) {
				$znumber = str_replace(",","",str_replace("$","",str_replace(" ","",$znumber)));
				if (is_numeric($znumber)) {
					$zmoneystring = "$".number_format($znumber, 2, '.', ',');
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-formatMoney=".$e->getMessage());
		}			
		return $zmoneystring;
	}
	
	public function escapeHTML($ztext) {
		$zchecktext = "";
		try {
			if ($this->hasValue($ztext)) {
				$zchecktext = htmlspecialchars($ztext, ENT_QUOTES, 'UTF-8');
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-escapeHTML=" . $e->getMessage());
		}
		return $zchecktext;
	}
	
	public function getHexFromRGB($zred, $zgreen, $zblue) {
		$zhex = "";
		try {
			if (is_numeric($zred)) {
				$zred = $zred * 255;
			} else {
				$zred = 255;
			}
			if (is_numeric($zgreen)) {
				$zgreen = $zgreen * 255;
			} else {
				$zgreen = 255;
			}
			if (is_numeric($zblue)) {
				$zblue = $zblue * 255;
			} else {
				$zblue = 255;
			}
			$zhex =  sprintf("#%02x%02x%02x", $zred, $zgreen, $zblue);
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getHexFromRGB=" . $e->getMessage());
		}
		return $zhex;
	}
	
	public function confirmKey($zkey, $zwebtype, $zwebid) {
		global $wtwdb;
		$zsuccess = false;
		try {
			$zkey = $this->decode64($zkey);
			if ($this->hasValue($zkey)) {
				$zsharehash = "";
				$zresults = array();
				switch ($zwebtype) {
					case "community":
						$zresults = $wtwdb->query("
							select sharehash
							from ".wtw_tableprefix."communities
							where communityid='".$zwebid."';");
						break;
					case "building":
						$zresults = $wtwdb->query("
							select sharehash
							from ".wtw_tableprefix."buildings
							where buildingid='".$zwebid."';");
						break;
					case "thing":
						$zresults = $wtwdb->query("
							select sharehash
							from ".wtw_tableprefix."things
							where thingid='".$zwebid."';");
						break;
				}
				foreach ($zresults as $zrow) {
					$zsharehash = $zrow["sharehash"];
				}
				if ($this->hasValue($zkey) && $this->hasValue($zsharehash)) {
					if (password_verify($zkey, $zsharehash)) {
						$zsuccess = true;
					}
				}
			}
			switch ($zwebtype) {
				case "community":
					$zresults = $wtwdb->query("
						update ".wtw_tableprefix."communities
						set sharehash = ''
						where communityid='".$zwebid."';");
					break;
				case "building":
					$zresults = $wtwdb->query("
						update ".wtw_tableprefix."buildings
						set sharehash = ''
						where buildingid='".$zwebid."';");
					break;
				case "thing":
					$zresults = $wtwdb->query("
						update ".wtw_tableprefix."things
						set sharehash = ''
						where thingid='".$zwebid."';");
					break;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwdb.php-confirmKey=".$e->setKeyHash());
		}
		return $zsuccess;
	}

	public function dirSize($zdirectory) {
		$zsize = 0;
		try {
			foreach(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($zdirectory)) as $zfile){
				if ($zfile -> getFileName() != '..') {
					$zsize += $zfile->getSize();
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-dirSize=".$e->getMessage());
		}
		return $zsize;
	} 

	public function getFileCount($zdirectory) {
		$zfilecount = 0;
		try {
			$zdirectory = rtrim($zdirectory, "/");
			if (file_exists($zdirectory)) {
				$zfiles = new FilesystemIterator($zdirectory, FilesystemIterator::SKIP_DOTS);
				$zfilecount = iterator_count($zfiles);
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getFileCount=".$e->getMessage());
		}
		return $zfilecount;
	} 

	public function getobjectanimations($zuploadobjectid) {
		$zobjectanimations = array();
		try {
			$zresults = $this->query("
			    select a1.*,
					case when a1.soundid = '' then ''
						else
							(select filepath 
								from ".wtw_tableprefix."uploads 
								where uploadid=a1.soundid limit 1)
						end as soundpath,
					case when a1.moldevent='onload' then '2'
						when a1.moldevent='' then '0'
						else '1'
					end as sorder
				from ".wtw_tableprefix."uploadobjectanimations a1
				where a1.uploadobjectid='".$zuploadobjectid."'
					and a1.deleted=0
				order by sorder, a1.moldevent, a1.animationname, a1.objectanimationid;");
			$i = 0;
			foreach ($zresults as $zrow) {
				$zobjectanimations[$i] = array(
					'objectanimationid'=> $zrow['objectanimationid'],
					'animationname'=> $zrow['animationname'],
					'moldevent'=> $zrow['moldevent'],
					'moldnamepart'=> $zrow['moldnamepart'],
					'startframe'=> $zrow['startframe'],
					'endframe'=> $zrow['endframe'],
					'animationloop'=> $zrow['animationloop'],
					'speedratio'=> $zrow['speedratio'],
					'additionalscript'=> $zrow['additionalscript'],
					'additionalparameters'=> $zrow['additionalparameters'],
					'animationendscript'=> $zrow['animationendscript'],
					'animationendparameters'=> $zrow['animationendparameters'],
					'stopcurrentanimations'=> $zrow['stopcurrentanimations'],
					'soundid'=> $zrow['soundid'],
					'soundpath'=> $zrow['soundpath'],
					'soundmaxdistance'=> $zrow['soundmaxdistance']
				);
				$i += 1;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getobjectanimations=".$e->getMessage());
		}
		return $zobjectanimations;
	}

	public function getwebimages($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zgraphiclevel) {
		$zwebimages = array();
		try {
			if (!isset($zgraphiclevel) || empty($zgraphiclevel)) {
				$zgraphiclevel = -1;
			} elseif (is_numeric($zgraphiclevel) == false) {
				$zgraphiclevel = -1;
			}
			$zwebimages[0] = array(
				'imageid'=> '',
				'imagepath'=> '',
				'imagehoverid'=> '',
				'imagehoverpath'=> '',
				'imageclickid'=> '',
				'imageclickpath'=> '',
				'jsfunction'=> '',
				'jsparameters'=> '',
				'imageloaded'=> '0',
				'hoverloaded'=> '0',
				'clickloaded'=> '0'
			);
			$zresults = $this->query("
				select a1.webimageid,
					a1.pastwebimageid,
					a1.thingmoldid,
					a1.buildingmoldid,
					a1.communitymoldid,
					a1.imageindex,
					a1.graphiclevel,
					a1.jsfunction,
					a1.jsparameters,
					a1.userid,
					a1.alttag,
					a1.createdate,
					a1.createuserid,
					a1.updatedate,
					a1.updateuserid,
					a1.deleteddate,
					a1.deleteduserid,
					a1.deleted,
					case when not a1.thingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
									end 
								end
						else ''
					end as imageid,
					case when not a1.thingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
									end 
								end
						else ''
					end as imagepath,

					case when not a1.thingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
									end 
								end
						else ''
					end as imagehoverid,
					case when not a1.thingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
									end 
								end
						else ''
					end as imagehoverpath,

					case when not a1.thingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
									end 
								end
						else ''
					end as imageclickid,
					case when not a1.thingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
										else (select u1.filepath 
											from ".wtw_tableprefix."uploads u2 
												left join ".wtw_tableprefix."uploads u1 
													on u2.websizeid=u1.uploadid 
											where u2.uploadid=a1.imageclickid limit 1)
									end 
								end
						else ''
					end as imageclickpath
				from ".wtw_tableprefix."webimages a1 
					left join ".wtw_tableprefix."thingmolds t1 
						on a1.thingmoldid=t1.thingmoldid
					left join ".wtw_tableprefix."buildingmolds b1 
						on a1.buildingmoldid=b1.buildingmoldid
					left join ".wtw_tableprefix."communitymolds c1 
						on a1.communitymoldid=c1.communitymoldid
				where a1.thingmoldid='".$zthingmoldid."'
					and a1.buildingmoldid='".$zbuildingmoldid."'
					and a1.communitymoldid='".$zcommunitymoldid."'
					and a1.deleted=0
				order by a1.imageindex, a1.webimageid desc;");
			
			$i = 0;
			foreach ($zresults as $zrow) {
				$zwebimages[$i] = array(
					'imageid'=> $zrow["imageid"],
					'imagepath'=> $zrow["imagepath"],
					'imagehoverid'=> $zrow["imagehoverid"],
					'imagehoverpath'=> $zrow["imagehoverpath"],
					'imageclickid'=> $zrow["imageclickid"],
					'imageclickpath'=> $zrow["imageclickpath"],
					'jsfunction'=> $zrow["jsfunction"],
					'jsparameters'=> $zrow["jsparameters"],
					'imageloaded'=> '0',
					'hoverloaded'=> '0',
					'clickloaded'=> '0'
				);
				$i += 1;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getwebimages=".$e->getMessage());
		}
		return $zwebimages;
	}
	
	public function getmoldpoints($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zpathnumber, $zshape) {
		$zpathpoints = array();
		$zmoldid = "";
		try {
			if ($zshape == 'tube') {
				if (!empty($zcommunitymoldid)) {
					$zmoldid = $zcommunitymoldid;
				} else if (!empty($zbuildingmoldid)) {
					$zmoldid = $zbuildingmoldid;
				} else if (!empty($zthingmoldid)) {
					$zmoldid = $zthingmoldid;
				}
				/* get point data for a given mold (lines, ribbons, lathe, etc...) */
				$zresults = $this->query("
					select * 
					from ".wtw_tableprefix."moldpoints
					where moldid='".$zmoldid."'
						and pathnumber=".$this->checkNumber($pathnumber,1)."
						and deleted=0
					order by sorder,createdate;");

				$i = 0;
				foreach ($zresults as $zrow) {
					$zpathpoints[$i] = array(
						'x'=> $zrow["positionx"],
						'y'=> $zrow["positiony"],
						'z'=> $zrow["positionz"],
						'sorder'=> $zrow["sorder"]
					);
					$i += 1;
				}
				if ($i == 0) {
					$zpathpoints[0] = null;
				}
			} else {
				$zpathpoints[0] = null;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getmoldpoints=".$e->getMessage());
		}
		return $zpathpoints;
	}
	
	public function checkOptionalUpgrades() {
		try {
			$zhostuserid = '';
			if ($this->isUserInRole("Host") && $this->isUserInRole("Admin") == false && $this->isUserInRole("Developer") == false) {
				$zhostuserid = $this->userid;
			}
			$zresults = $this->query("
				select *
				from ".wtw_tableprefix."optionalupgrades
				where deleted=0;
			");
			foreach ($zresults as $zrow) {
				if ($this->isUserInRole("Admin") || $this->isUserInRole("Developer")) {
					switch ($zrow['title']) {
						case '3D Internet Services';
							$zpluginactive = false;
							$zresults2 = $this->query("
								select *
								from ".wtw_tableprefix."plugins
								where pluginname='wtw-3dinternet'
									and deleted=0;
							");
							foreach ($zresults2 as $zrow2) {
								if ($zrow2['active'] == '1') {
									$zpluginactive = true;
								}
							}
							$zresults3 = $this->query("
								select *
								from ".wtw_tableprefix."optionalupgradesapplied
								where optionalid='".$zrow['optionalid']."';
							");
							if (count($zresults3) > 0) {
								foreach ($zresults3 as $zrow3) {
									if (empty($zrow3['deleted'])) {
										if ($zpluginactive) {
											$this->query("
												update ".wtw_tableprefix."optionalupgradesapplied
												set activedate=now(),
													updatedate=now(),
													updateuserid='".$this->userid."',
													deleteddate=now(),
													deleteduserid='".$this->userid."',
													deleted=1
												where appliedid='".$zrow3['appliedid']."'
											");
										}
									} else if ($zpluginactive == false) {
										$this->query("
											update ".wtw_tableprefix."optionalupgradesapplied
											set activedate=null,
												updatedate=now(),
												updateuserid='".$this->userid."',
												deleteddate=null,
												deleteduserid='',
												deleted=0
											where appliedid='".$zrow3['appliedid']."'
										");
									}
								}
							} else if ($zpluginactive == false) {
								$zappliedid = $this->getRandomString(16,1);
								$this->query("
									insert into ".wtw_tableprefix."optionalupgradesapplied
									   (appliedid,
									    optionalid,
										activedate,
									    createdate,
										createuserid,
										updatedate,
										updateuserid)
									   values
									   ('".$zappliedid."',
									    '".$zrow['optionalid']."',
										now(),
										now(),
										'".$this->userid."',
										now(),
										'".$this->userid."');
								");
							}
							break;
						case 'Multiplayer Services':
							
							
							
							break;
					}
				} else if ($this->hasValue($zhostuserid)) {
					switch ($zrow['title']) {
						case 'Custom Domain Name':
							$zcustomdomain = false;
							$zappliedid = null;
							$zresults2 = $this->query("
								select wd1.*,
									oua1.appliedid
								from ".wtw_tableprefix."webdomains wd1
									left join ".wtw_tableprefix."optionalupgradesapplied oua1
									on oua1.optionalid='".$zrow['optionalid']."'
								where wd1.hostuserid='".$zhostuserid."'
									and wd1.deleted=0;
							");
							foreach ($zresults2 as $zrow2) {
								$zcustomdomain = true;
								$zappliedid = $zrow2['appliedid'];
							}
							if ($zcustomdomain == false && !isset($zappliedid)) {
								$zappliedid = $this->getRandomString(16,1);
								$this->query("
									insert into ".wtw_tableprefix."optionalupgradesapplied
									   (appliedid,
									    optionalid,
										hostuserid,
										price,
									    createdate,
										createuserid,
										updatedate,
										updateuserid)
									   values
									   ('".$zappliedid."',
									    '".$zrow['optionalid']."',
										'".$zhostuserid."',
										".$zrow['startprice'].",
										now(),
										'".$this->userid."',
										now(),
										'".$this->userid."');
								");
							}
							break;
						case 'SSL for Custom Domain Name':
							$zstartprice = 0;
							if (isset($zrow['startprice']) && !empty($zrow['startprice'])) {
								$zstartprice = $zrow['startprice'];
							}
							$zresults2 = $this->query("
								select wd1.*,
									oua1.appliedid
								from ".wtw_tableprefix."webdomains wd1
									left join ".wtw_tableprefix."optionalupgradesapplied oua1
									on oua1.optionalid='".$zrow['optionalid']."'
									and wd1.domainname=oua1.domainname
								where wd1.hostuserid='".$zhostuserid."'
									and wd1.deleted=0;
							");
							foreach ($zresults2 as $zrow2) {
								if (empty($zrow2["forcehttps"]) && !isset($zrow2['appliedid'])) {
									if (isset($zrow2['sslprice']) && !empty($zrow2['sslprice'])) {
										$zstartprice = $zrow2['sslprice'];
									}
									$zappliedid = $this->getRandomString(16,1);
									$this->query("
										insert into ".wtw_tableprefix."optionalupgradesapplied
										   (appliedid,
											optionalid,
											hostuserid,
											domainname,
											price,
											createdate,
											createuserid,
											updatedate,
											updateuserid)
										   values
										   ('".$zappliedid."',
											'".$zrow['optionalid']."',
											'".$zhostuserid."',
											'".$zrow2['domainname']."',
											".$zstartprice.",
											now(),
											'".$this->userid."',
											now(),
											'".$this->userid."');
									");
								}
							}
							break;
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkOptionalUpgrades=".$e->getMessage());
		}
	}
	
	public function getWebAliases($zwebtype, $zwebid) {
		$zdomains = array();
		try {
			$ztablename = "";
			switch ($zwebtype) {
				case "community":
					$ztablename = "communities";
					break;
				case "building":
					$ztablename = "buildings";
					break;
				case "thing":
					$ztablename = "things";
					break;
			}
			if ($this->hasValue($zwebid) && $this->hasValue($ztablename)) {
				$i = 0;
				/* get web alias (domain names) for a community */
				$zresults = $this->query("
					select w1.*,
						t1.analyticsid
					from ".wtw_tableprefix."webaliases w1
						left join ".wtw_tableprefix.$ztablename." t1
							on w1.".$zwebtype."id=t1.".$zwebtype."id
					where w1.".$zwebtype."id='".$zwebid."'
					   and w1.deleted=0
					order by w1.domainname, w1.webaliasid;");
				foreach ($zresults as $zrow) {
					$zdomains[$i]  = array(
						'domainname' => $zrow["domainname"],
						'analyticsid'=> $zrow["analyticsid"]
					); 
					$i += 1;
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getWebAliases=".$e->getMessage());
		}
		return $zdomains;
	}

	public function trackPageView($zcurrentpage) {
		$zsuccess = false;
		try {
			if (defined('wtw_googleanalytics')) {
				$zcurl=curl_init();
				curl_setopt($zcurl, CURLOPT_URL,'http://www.google-analytics.com/collect/v=1&tid='.wtw_googleanalytics.'&cid=555&t=pageview&dp='.$zcurrentpage);
				curl_setopt($zcurl, CURLOPT_CONNECTTIMEOUT, 2);
				curl_setopt($zcurl, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zcurl, CURLOPT_USERAGENT, 'Geoip tracker');
				$zquery = curl_exec($zcurl);
				curl_close($zcurl);
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-trackPageView=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function __($zlabel) {
		/* Language translation based on language file */
		global $wtw;
		$znewlabel = $zlabel;
		try {
			$zsetlanguage = "English";
			if (defined("wtw_defaultlanguage")) {
				$zsetlanguage = wtw_defaultlanguage;
			}
			if ($zsetlanguage != "English") {
				/* look for translation in core language files */
				$zdir = wtw_rootpath."/core/languages";
				if (is_dir($zdir)) {
					if ($zdirectory = opendir($zdir)) {
						while (($zfile = readdir($zdirectory)) !== false) {
							if ($zfile != '.' && $zfile != '..') {
								$zlanguageurl = $wtw->domainurl."/core/languages/".$zfile;
								$zlanguagedata = $this->openFilefromURL($zlanguageurl);
								$zlanguagedata = json_decode($zlanguagedata);
								if (isset($zlanguagedata[0]->translate)) {
									if (isset($zlanguagedata[0]->language)) {
										if (strtolower($zlanguagedata[0]->language) == strtolower($zsetlanguage)) {
											foreach($zlanguagedata[0]->translate as $zkey => $zvalue) {
												if (strtolower($zlabel) == strtolower($zkey)) {
													$znewlabel = $zvalue;
												}
											}
										}
									}
								}
							}
						}
						closedir($zdirectory);
					}
				}
				if ($znewlabel == $zlabel) {
					/* look for translation in plugin folders */
					$zdir = wtw_rootpath."/content/plugins";
					if (is_dir($zdir)) {
						if ($zdirectory = opendir($zdir)) {
							while (($zfile = readdir($zdirectory)) !== false) {
								if ($zfile != '.' && $zfile != '..') {
									if (is_dir($zdir.'/'.$zfile)) {
										if (is_dir($zdir.'/'.$zfile.'/languages')) {
											if ($zdirectory2 = opendir($zdir.'/'.$zfile.'/languages')) {
												while (($zfile2 = readdir($zdirectory2)) !== false) {
													if ($zfile2 != '.' && $zfile2 != '..') {
														$zlanguageurl = $wtw->domainurl."/content/plugins/".$zfile."/languages/".$zfile2;
														$zlanguagedata = $this->openFilefromURL($zlanguageurl);
														$zlanguagedata = json_decode($zlanguagedata);
														if (isset($zlanguagedata[0]->translate)) {
															if (isset($zlanguagedata[0]->language)) {
																if (strtolower($zlanguagedata[0]->language) == strtolower($zsetlanguage)) {
																	foreach($zlanguagedata[0]->translate as $zkey => $zvalue) {
																		if (strtolower($zlabel) == strtolower($zkey)) {
																			$znewlabel = $zvalue;
																		}
																	}
																}
															}
														}
													}
												}
												closedir($zdirectory2);
											}
										}
									}
								}
							}
							closedir($zdirectory);
						}
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-__language=".$e->getMessage());
		}
		return $znewlabel;
	}	

}

	function wtwdb() {
		return wtwdb::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwdb'] = wtwdb();
?>
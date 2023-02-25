<?php
class wtwftp {
	/* wtwftp class for admin database functions for api related functionality */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	private $conn = null; 
	private $logData;
	private $ftpUser;
	private $ftpPass;
	private $ftpHost;
	private $retry;
	private $ftpPasv; 
	private $ftpMode; 
	private $verbose; 
	private $logPath; 

	public function __construct() {
		global $wtwhandlers;
		if (!defined('wtw_chmod')) {
			define("wtw_chmod", "775");
		}
		$this->retry = (isset($o['reattempts'])) ? $o['reattempts'] : 3;
        $this->ftpPasv = (isset($o['passive_mode'])) ? $o['passive_mode'] : true;
        $this->ftpMode = (isset($o['transfer_mode'])) ? $o['transfer_mode'] : FTP_BINARY;
        $this->verbose = (isset($o['verbose'])) ? $o['verbose'] : false;
        $this->logPath = (isset($o['log_path'])) ? $o['log_path'] : $handlers->contentpath.'\ftplog'; 
	}

	function __destruct() {
		/* destruct class */
		global $wtwhandlers;
		try {
			$this->closeConn();
			$this->writeToLog();
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-__destruct=".$e->getMessage());
		}
    }

	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function conn($zhostname, $zusername='', $zpassword='') {
		/* get connection credentials */
		global $wtwhandlers;
		try {
			if ((!isset($zhostname) || empty($zhostname)) && defined('wtw_ftphost')) {
				$zhostname = wtw_ftphost;
			}
			if ((!isset($zusername) || empty($zusername)) && defined('wtw_ftpuser')) {
				$zusername = wtw_ftpuser;
			}
			if ((!isset($zpassword) || empty($zpassword)) && defined('wtw_ftppassword')) {
				$zpassword = wtw_ftppassword;
			}
			$this->ftpUser = $zusername;
			$this->ftpPass = $zpassword;
			$this->ftpHost = $zhostname;
			$this->initConn();
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-conn=".$e->getMessage());
		}
    }	
	
	private function initConn() {
		/* init ftp connection */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			$this->conn = ftp_connect($this->ftpHost);
			$zloginresult = ftp_login($this->conn, $this->ftpUser, $this->ftpPass);
			if ($this->conn && $zloginresult) {
				ftp_pasv($this->conn, $this->ftpPasv);
				$zsuccess = true;
			}       
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-initConn=".$e->getMessage());
		}
        return $zsuccess;
    }	

	public function pwd($zlocal = false) {
		/* get current directory name */
		global $wtwhandlers;
		$zresponse = '';
		try {
			$zresponse = $zlocal ? getcwd() : ftp_pwd($this->conn);
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-pwd=".$e->getMessage());
		}
		return $zresponse;
    }

	public function put($zdestinationfile, $zsourcefile, $zretry = 0) {
		/* put file to ftp server */
		global $wtwhandlers;
		$zsuccess = true;
		try {
			if (file_exists($zsourcefile)) { 
				if (!$this->isDir($zsourcefile, true)) {
					$this->createSubDirs($zdestinationfile);
					if (!ftp_put($this->conn, $zdestinationfile, $zsourcefile, $this->ftpMode)) {
						$zretry += 1;
						if ($zretry > $this->zretry) {
							$this->logData('Error when uploading file: '.$zsourcefile.' => '.$zdestinationfile, 'error');
							$zsuccess = false;
						} else {
							if ($this->verbose) {
								echo 'Retry: '.$zretry."\n";
							}
							$this->reconnect();
							$this->put($zdestinationfile, $zsourcefile, $zretry);
						}
					} else {
						$this->logData('Upload:'.$zsourcefile.' => '.$zdestinationfile, 'ok');
					}
				} else {
					$this->recursive($zdestinationfile, $zsourcefile, 'put');
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-put=".$e->getMessage());
		}
		return $zsuccess;
    }

	public function get($zdestinationfile, $zsourcefile, $zretry = 0) {
		/* get file from ftp server */
		global $wtwhandlers;
		$zsuccess = true;
		try {
			if (!$this->isDir($zsourcefile, false)) {
				if ($this->verbose) {
					echo $zsourcefile.' => '.$zdestinationfile."\n";
				}
				$this->createSubDirs($zdestinationfile, false, true);
				if (!ftp_get($this->conn, $zdestinationfile, $zsourcefile, $this->ftpMode)) {
					$zretry += 1;
					if ($zretry > $this->zretry) {
						$this->logData('Error when downloading file: '.$zsourcefile.' => '.$zdestinationfile, 'error');
						$zsuccess = false;
					} else {
						if ($this->verbose) {
							echo 'Retry: '.$zretry."\n";
						}
						$this->reconnect();
						$this->get($zdestinationfile, $zsourcefile, $zretry);
					}
				} else {
					$this->logData('Download:'.$zsourcefile.' => '.$zdestinationfile, 'ok');
				}
			} else {
				$this->recursive($zdestinationfile, $zsourcefile, 'get');
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-get=".$e->getMessage());
		}
		return $zsuccess;
    }
	
	public function makeDir($zdir, $zlocal = false) {
		/* make directory using ftp */
		global $wtwhandlers;
		$zsuccess = false;
        try {
			if ($zlocal) {
				if (!file_exists($zdir) && !is_dir($zdir)) {
					$zsuccess = mkdir($zdir, wtw_chmod); 
				}
			} else {
				ftp_mkdir($this->conn, $zdir);
				$zsuccess = ftp_chmod($this->conn, wtw_chmod, $zdir);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-makeDir=".$e->getMessage());
		}
		return $zsuccess;
    }

	public function cdUp($zlocal) {
		/* change directory up */
		global $wtwhandlers;
		$zresponse = null;
		try {
			$zresponse = $zlocal ? chdir('..') : ftp_cdup($this->conn);
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-cdUp=".$e->getMessage());
		}
		return $zresponse;
    }
	
	public function listFiles($zfile, $zlocal = false) {
		/* list files on ftp host */
		global $wtwhandlers;
		$zresponse = false;
		try {
			if ($this->isDir($zfile, $zlocal)) {
				if ($zlocal) {
					$zresponse = scandir($zfile);
				} else {
					if (!preg_match('/\//', $zfile)) {
						$zresponse = ftp_nlist($this->conn, $zfile);
					} else {
						$zdirs = explode('/', $zfile);
						foreach ($zdirs as $zdir) {
							$this->changeDir($zdir, $zlocal);
						}
						$zlast = count($zdirs)-1;
						$this->cdUp($zlocal);
						$zlist = ftp_nlist($this->conn, $zdirs[$zlast]);
						$i = 0;
						foreach ($zdirs as $zdir) {
							if ($i < $zlast) {
								$this->cdUp($zlocal);
							}
							$i++;
						}
						$zresponse = $zlist;
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-listFiles=".$e->getMessage());
		}
		return $zresponse;
    }

	public function changeDir($zdir, $zlocal = false) {
		/* change directory on ftp */
		global $wtwhandlers;
		$zresponse = true;
		try {
			$zresponse = $zlocal ? chdir($zdir) : @ftp_chdir($this->conn, $zdir);
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-changeDir=".$e->getMessage());
			$zresponse = false;
		}
		return $zresponse;
    }

	function createSubDirs($zfile, $zlast = false, $zlocal = false, $zchdirback = true) {
		/* create sub directory on ftp */
		global $wtwhandlers;
		try {
			if (preg_match('/\//',$zfile)) {
				$zorigin = $this->pwd($zlocal);
				if (!$zlast) {
					$zfile = substr($zfile, 0, strrpos($zfile,'/'));
				}
				$zdirs = explode('/',$zfile);
				foreach ($zdirs as $zdir) {
					if (!$this->isDir($zdir, $zlocal)) {
						$this->makeDir($zdir, $zlocal);
						$this->changeDir($zdir, $zlocal);
					} else {
						$this->changeDir($zdir, $zlocal);
					}
				}
				if ($zchdirback) {
					$this->changeDir($zorigin, $zlocal);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-createSubDirs=".$e->getMessage());
		}
    }
	
	function recursive($zdestinationfile, $zsourcefile, $zmode) {
		/* recursive get or put */
		global $wtwhandlers;
		try {
			$zlocal = ($zmode == 'put') ? true : false;
			$zlist = $this->listFiles($zsourcefile, $zlocal);
			if ($this->verbose) {
				echo "\n".'Folder: '.$zsourcefile."\n";
			}
			$this->logData(($zmode=='get')?('Download:'):('Upload:').$zsourcefile.' => '.$zdestinationfile, 'ok');       

			if ($this->verbose) {
				print_r($zlist);
			}
			if (count($zlist) == 2) {// blank folder
				if ($zmode == 'get') {
					$this->makeDir($zdestinationfile, true);
				}
				if ($zmode == 'put') {
					$this->makeDir($zdestinationfile);
				}
			}   
			foreach ($zlist as $zfile) {
				if ($zfile != '.' && $zfile != '..') {
					$zdestfile = $zdestinationfile.'/'.$zfile;
					$zsrcfile = $zsourcefile.'/'.$zfile;
					if ($this->isDir($zsrcfile, $zlocal)) {
						$this->recursive($zdestfile, $zsrcfile, $zmode);
					} else {
						if ($zlocal) {
							$this->put($zdestfile, $zsrcfile);
						} else {
							$this->get($zdestfile, $zsrcfile);
						}
					} 
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-recursive=".$e->getMessage());
		}
    }
	
	public function isDir($zdir, $zlocal) {
		/* is file a directory on ftp */
		global $wtwhandlers;
		$zresponse = false;
		try {
			if ($zlocal) {
				$zresponse = is_dir($zdir);
			} else if ($this->changeDir($zdir)) {
				$zresponse = $this->cdUp(0);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-isDir=".$e->getMessage());
		}
		return $zresponse;
    }
	
	function logData($zdata, $ztype) {
		/* log entry */
		global $wtwhandlers;
		try {
			$this->logData[$ztype][] = $zdata;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-logData=".$e->getMessage());
		}
    }
	
	public function writeToLog() {
		/* save log to files */
		global $wtwhandlers;
		$zresponse = true;
		try {
			if (!$this->logPath) {
				$zresponse = false;
			} else {
				$this->makeDir($this->logPath, true);
				$zlog = $this->logData;  
				$zdate = '\n'.date('y-m-d H:i:s').' ';
				if ($wtwhandlers->hasValue($zlog['error'])) {
					$zlogentry = date('y-m-d H:i:s').' '.join($zdate,$zlog['error']).'\r\n';
					$zfile = $this->logPath.'/'.$this->ftpUser.'-error.log';
					$zopenfile = fopen($zfile, 'a');
					fwrite($zopenfile,$zlogentry);
					fclose($zopenfile);
				}
				if ($wtwhandlers->hasValue($zlog['ok'])) {
					$zlogentry = date('y-m-d H:i:s').' '.join($zdate,$zlog['ok']).'\r\n';
					$zfile = $this->logPath.'/'.$this->ftpUser.'-ok.log';
					$zopenfile = fopen($zfile, 'a');
					fwrite($zopenfile,$zlogentry);
					fclose($zopenfile);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-writeToLog=".$e->getMessage());
			$zresponse = false;
		}
		return $zresponse;
    }
	
	public function reconnect() {
		/* reconnect to ftp */
		global $wtwhandlers;
		try {
			$this->closeConn();
			$this->initConn();
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-reconnect=".$e->getMessage());
		}
    }
	
	public function closeConn() {
		/* close ftp connection */
		global $wtwhandlers;
		$zsuccess = true;
		try {
			$zsuccess = ftp_close($this->conn);
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwftp.php-closeConn=".$e->getMessage());
			$zsuccess = false;
		}
		return $zsuccess;
    }
	
}

	function wtwftp() {
		return wtwftp::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwftp'] = wtwftp();
?>
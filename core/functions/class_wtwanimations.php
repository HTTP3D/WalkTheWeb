<?php
class wtwanimations {
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

	public function saveObjectAnimation($zobjectanimationid, $zuploadobjectid, $zanimationname, $zmoldevent, $zmoldnamepart, $zstartframe, $zendframe, $zanimationloop, $zspeedratio, $zanimationendscript, $zanimationendparameters, $zstopcurrentanimations, $zsoundid, $zsoundmaxdistance) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if(empty($zstartframe) || !isset($zstartframe)) {
				$zstartframe = '0';
			}
			if(empty($zendframe) || !isset($zendframe)) {
				$zendframe = '0';
			}
			if(!empty($zanimationloop) && isset($zanimationloop)) {
				if ($zanimationloop != '1') {
					$zanimationloop = '0';
				}
			} else {
				$zanimationloop = '0';
			}
			if(empty($zspeedratio) || !isset($zspeedratio)) {
				$zspeedratio = '1.00';
			}
			if(empty($zsoundmaxdistance) || !isset($zsoundmaxdistance)) {
				$zsoundmaxdistance = '100.00';
			} elseif (is_numeric($zsoundmaxdistance) == false) {
				$zsoundmaxdistance = '100.00';
			}
			if(!empty($zstopcurrentanimations) && isset($zstopcurrentanimations)) {
				if ($zstopcurrentanimations != '1') {
					$zstopcurrentanimations = '0';
				}
			} else {
				$zstopcurrentanimations = '0';
			}
			$found = false;
			$zresults = $wtwiframes->query("
				select objectanimationid 
				from ".wtw_tableprefix."uploadobjectanimations 
				where objectanimationid='".$zobjectanimationid."' 
					and not objectanimationid='' 
				limit 1;");
			foreach ($zresults as $zrow) {
				$found = true;
			}
			if (!empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
				if ($found) {
					$wtwiframes->query("
						insert into ".wtw_tableprefix."uploadobjectanimations
							(objectanimationid,
							 uploadobjectid,
							 userid,
							 animationname,
							 moldevent,
							 moldnamepart,
							 startframe,
							 endframe,
							 animationloop,
							 speedratio,
							 animationendscript,
							 animationendparameters,
							 stopcurrentanimations,
							 soundid,
							 soundmaxdistance,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zobjectanimationid."',
							 '".$zuploadobjectid."',
							 '".$wtwiframes->userid."',
							 '".$zanimationname."',
							 '".$zmoldevent."',
							 '".$zmoldnamepart."',
							 ".$zstartframe.",
							 ".$zendframe.",
							 ".$zanimationloop.",
							 ".$zspeedratio.",
							 '".$zanimationendscript."',
							 '".$zanimationendparameters."',
							 ".$zstopcurrentanimations.",
							 '".$zsoundid."',
							 ".$zsoundmaxdistance.",
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				} else {
					$wtwiframes->query("
						update ".wtw_tableprefix."uploadobjectanimations
						set	objectanimationid='".$zobjectanimationid."',
							userid='".$wtwiframes->userid."',
							animationname='".$zanimationname."',
							moldevent='".$zmoldevent."',
							moldnamepart='".$zmoldnamepart."',
							startframe=".$zstartframe.",
							endframe=".$zendframe.",
							animationloop=".$zanimationloop.",
							speedratio=".$zspeedratio.",
							animationendscript='".$zanimationendscript."',
							animationendparameters='".$zanimationendparameters."',
							stopcurrentanimations=".$zstopcurrentanimations.",
							soundid='".$zsoundid."',
							soundmaxdistance=".$zsoundmaxdistance.",
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."',
							deleteddate=null,
							deleteduserid='',
							deleted=0
						where objectanimationid='".$zobjectanimationid."'
							and uploadobjectid='".$zuploadobjectid."'
							and userid='".$wtwiframes->userid."';");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwanimations.php-saveObjectAnimation=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function deleteObjectAnimation($zobjectanimationid, $zuploadobjectid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if (!empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
				$found = false;
				$zresults = $wtwiframes->query("
					select objectanimationid 
					from ".wtw_tableprefix."uploadobjectanimations 
					where objectanimationid='".$zobjectanimationid."' 
						and uploadobjectid='".$zuploadobjectid."'
						and not objectanimationid=''
						and not uploadobjectid=''
					limit 1;");
				foreach ($zresults as $zrow) {
					$found = true;
				}
				if ($found) {
					$wtwiframes->query("
						update ".wtw_tableprefix."uploadobjectanimations
						set	deleteddate=now(),
							deleteduserid='".$wtwiframes->userid."',
							deleted=1
						where objectanimationid='".$zobjectanimationid."'
							and uploadobjectid='".$zuploadobjectid."'
							and userid='".$wtwiframes->userid."';");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwanimations.php-deleteObjectAnimation=".$e->getMessage());
		}
		return $zsuccess;
	}
}

	function wtwanimations() {
		return wtwanimations::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwanimations'] = wtwanimations();
?>
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

	public function getUploadedFileAnimationsDetails($zuploadobjectid) {
		global $wtwhandlers;
		$zresults = array();
		try {
			$zresults = $wtwhandlers->query("
				select a1.*,
					case when a1.soundid = '' then ''
						else
							(select filepath 
								from ".wtw_tableprefix."uploads 
								where uploadid=a1.soundid limit 1)
						end as soundpath,
					case when a1.moldevent='' then '0'
						else '1'
					end as sorder
				from ".wtw_tableprefix."uploadobjectanimations a1
					inner join ".wtw_tableprefix."uploadobjects uo1
						on a1.uploadobjectid=uo1.uploadobjectid
				where a1.uploadobjectid='".$zuploadobjectid."'
					and (a1.userid='".$wtwhandlers->userid."'
						or uo1.stock=1)
					and a1.deleted=0
				order by sorder, a1.moldevent, a1.animationname, a1.objectanimationid;");
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwanimations.php-getUploadedFileAnimationsDetails=".$e->getMessage());
		}
		return $zresults;
	}

	public function getObjectAnimation($zobjectanimationid) {
		global $wtwhandlers;
		$zresults = array();
		try {
			$zresults = $wtwhandlers->query("
				select a1.*,
					case when a1.soundid = '' then ''
						else
							(select filepath 
								from ".wtw_tableprefix."uploads 
								where uploadid=a1.soundid limit 1)
						end as soundpath,
					case when a1.soundid = '' then ''
						else
							(select filename 
								from ".wtw_tableprefix."uploads 
								where uploadid=a1.soundid limit 1)
						end as soundname
				from ".wtw_tableprefix."uploadobjectanimations a1
				where a1.objectanimationid='".$zobjectanimationid."'
					and a1.userid='".$wtwhandlers->userid."'
					and a1.deleted=0
				limit 1;");
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwanimations.php-getObjectAnimation=".$e->getMessage());
		}
		return $zresults;
	}

	public function saveObjectAnimation($zobjectanimationid, $zuploadobjectid, $zanimationname, $zmoldevent, $zmoldnamepart, $zstartframe, $zendframe, $zanimationloop, $zspeedratio, $zanimationendscript, $zanimationendparameters, $zstopcurrentanimations, $zsoundid, $zsoundmaxdistance) {
		global $wtwhandlers;
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
			$zresults = $wtwhandlers->query("
				select objectanimationid 
				from ".wtw_tableprefix."uploadobjectanimations 
				where objectanimationid='".$zobjectanimationid."' 
					and not objectanimationid='' 
				limit 1;");
			foreach ($zresults as $zrow) {
				$found = true;
			}
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				if ($found) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploadobjectanimations
						set	objectanimationid='".$zobjectanimationid."',
							userid='".$wtwhandlers->userid."',
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
							updateuserid='".$wtwhandlers->userid."',
							deleteddate=null,
							deleteduserid='',
							deleted=0
						where objectanimationid='".$zobjectanimationid."'
							and uploadobjectid='".$zuploadobjectid."'
							and userid='".$wtwhandlers->userid."';");
				} else {
					$wtwhandlers->query("
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
							 '".$wtwhandlers->userid."',
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
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwanimations.php-saveObjectAnimation=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function deleteObjectAnimation($zobjectanimationid) {
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				$found = false;
				$zresults = $wtwhandlers->query("
					select objectanimationid 
					from ".wtw_tableprefix."uploadobjectanimations 
					where objectanimationid='".$zobjectanimationid."' 
						and not objectanimationid=''
						and not uploadobjectid=''
					limit 1;");
				foreach ($zresults as $zrow) {
					$found = true;
				}
				if ($found) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."uploadobjectanimations
						set	deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where objectanimationid='".$zobjectanimationid."'
							and userid='".$wtwhandlers->userid."';");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwanimations.php-deleteObjectAnimation=".$e->getMessage());
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
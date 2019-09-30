<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/uploadedfiledetails.php");
	
	$zuploadobjectid = $wtwiframes->getVal("uploadobjectid","");
	$zobjectanimationid = $wtwiframes->getVal("objectanimationid","");
	$zobjectfolder = '';
	$zobjectfile = '';
	$zstock = 0;
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwanimations.php');
		require_once('../functions/class_wtwuploads.php');
		global $wtwuploads;
		global $wtwanimations;
		$zobjectfolder = $_POST["wtw_tobjectfolder"];
		$zobjectanimationid = $_POST["wtw_tobjectanimationid"];
		if (isset($_POST["wtw_tdeleteanimation"]) && !empty($_POST["wtw_tdeleteanimation"])) {
			$wtwanimations->deleteObjectAnimation($_POST["wtw_tdeleteanimation"], $zuploadobjectid);
			$zobjectanimationid = '';
		} elseif (isset($zobjectanimationid) && !empty($zobjectanimationid)) {
			$wtwanimations->saveObjectAnimation($zobjectanimationid, $zuploadobjectid, $_POST["wtw_tanimationname"], $_POST["wtw_tmoldevent"], $_POST["wtw_tmoldnamepart"], $_POST["wtw_tstartframe"], $_POST["wtw_tendframe"], $_POST["wtw_tanimationloop"], $_POST["wtw_tspeedratio"], $_POST["wtw_tanimationendscript"], $_POST["wtw_tanimationendparameters"], $_POST["wtw_tstopcurrentanimations"], $_POST["wtw_tobjectsoundid"], $_POST["wtw_tobjectmaxdistance"]);
			$zobjectanimationid = '';
		}
		if(isset($_SESSION['wtw_uploadpathid']) && !empty($_SESSION['wtw_uploadpathid'])) {
			$zuploadpathid = $_SESSION['wtw_uploadpathid'];
			if (isset($_POST["wtw_tdeletefile"]) && !empty($_POST["wtw_tdeletefile"])) {
				$zdeletefile = $_POST["wtw_tdeletefile"];
				$zfilename = $_POST["wtw_tobjectfile"];
				$zuploadpath = $wtwiframes->contentpath;
				if(isset($_SESSION['wtw_uploadpathid']) && !empty($_SESSION['wtw_uploadpathid'])) {
					$pathname = pathinfo('/'.$zfilename);
					$newfolder = $pathname['filename'];
					if (file_exists($zuploadpath."\\uploads\\".$_SESSION['wtw_uploadpathid']."\\objects\\".$newfolder."\\".$zdeletefile)) {
						unlink($zuploadpath."\\uploads\\".$_SESSION['wtw_uploadpathid']."\\objects\\".$newfolder."\\".$zdeletefile);
					}
				}
			} else {
				if(strpos($zobjectfolder,$zuploadpathid) !== false) {
					if (isset($_FILES["wtw_fileToUpload"]["tmp_name"]) && !empty($_FILES["wtw_fileToUpload"]["tmp_name"])) {
						$zisvalid = 1;
						$zpastfilename = basename(strtolower($_FILES["wtw_fileToUpload"]["name"]));
						$zfileextension = pathinfo($zpastfilename,PATHINFO_EXTENSION);
						$zfilesize = $_FILES["wtw_fileToUpload"]["size"];
						$zfiletype = $_FILES["wtw_fileToUpload"]["type"];
						$zfilename = $wtwiframes->getRandomString(16,1).".".$zfileextension;
						$dir = str_replace('/','\\',str_replace('/content',$wtwiframes->contentpath,$zobjectfolder));
						$ztargetfile = $dir."\\".$zpastfilename;
						if (file_exists($ztargetfile)) {
							unlink($ztargetfile);
						}
						if ($zfilesize > 128000000) {
							echo "Your file is too large.";
							$zisvalid = 0;
						}
						if(strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "manifest" && strtolower($zfileextension) != "txt" && strtolower($zfileextension) != "jpg" && strtolower($zfileextension) != "png" && strtolower($zfileextension) != "jpeg" && strtolower($zfileextension) != "gif" && strtolower($zfileextension) != "wav" && strtolower($zfileextension) != "mp3" && strtolower($zfileextension) != "mp4" && strtolower($zfileextension) != "webm" && strtolower($zfileextension) != "ogv" && strtolower($zfileextension) != "bin" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "bgltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "blend" && strtolower($zfileextension) != "blend1" && strtolower($zfileextension) != "log") {
							echo "Only babylon, gltf, glb, manifest, txt, image, or audio files are allowed at this time.";
							$zisvalid = 0;
						}
						if ($zisvalid == 0) {
							echo "Your file was not uploaded.";
						} else {
							if (move_uploaded_file($_FILES["wtw_fileToUpload"]["tmp_name"], $ztargetfile) == false) {
								echo "There was an error uploading your file.";
							}
						}
					}
				}
			}
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-uploadedfiledetails.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Edit Uploaded Object</title>
	<link rel="stylesheet" type="text/css" href="/core/styles/wtw_admin.css" />
	<link rel="stylesheet" type="text/css" href="/core/styles/wtw_core.css" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
	<style type="text/css">
		body, html { 
			background-color: white;
		}
	</style>
</head>
<body style="overflow-y:scroll;">
	<form id="wtw_form1" name="wtw_form1" action="uploadedfiledetails.php?uploadobjectid=<?php echo $zuploadobjectid ?>" method="post" enctype="multipart/form-data">
		<input type="button" id="wtw_buploadcommunityimage" name="wtw_buploadcommunityimage" value="Upload file" onclick="dGet('wtw_fileToUpload').click(); return (false);" style="cursor: pointer;display:none;visibility:hidden;" />
		<div style="display:none;visibility:hidden;">
			<input type="file" name="wtw_fileToUpload" id="wtw_fileToUpload" onchange="window.parent.dGet('wtw_bstartimageupload').innerHTML = 'Uploading...';window.parent.dGet('wtw_bstartimageupload').onclick='';dGet('wtw_submit').click();">
			<input type="submit" value="Upload Image" name="wtw_submit" id="wtw_submit">
		</div>
		<div id="wtw_selectimageformscroll4" class="formsnocroll" style="white-space:normal;">
	
<?php
	if (!empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
		$zresults = $wtwiframes->query("
			select *
			from ".wtw_tableprefix."uploadobjects
			where userid='".$wtwiframes->userid."'
				and uploadobjectid='".$zuploadobjectid."';");
		foreach ($zresults as $zrow) {
			$zstock = $zrow["stock"];
			$zobjectfolder = $zrow["objectfolder"];
			if ($zstock == 1) {
				echo "<h1 style='color:black;margin-left:20px;'>View Stock 3D Object</h1>";
			} else {
				echo "<h1 style='color:black;margin-left:20px;'>Edit 3D Object</h1>";
			}
			$zcreatedate = $zrow["createdate"];
			$zcreatedate = date('m/d/Y', strtotime($zcreatedate));
			echo ("<div class='wtw-objectcontainer'><div class='wtw-objectfile'>".$zrow["objectfile"]."</div><div class='wtw-objectfolder'>".$zobjectfolder."<br /><br /><span style='color:gray;'>Uploaded on </span>".$zcreatedate."</div></div>");

			$dir = str_replace('/','\\',str_replace('/content',$wtwiframes->contentpath,$zobjectfolder));
			$dir = rtrim($dir, "\\");
			echo "<div class='wtw-clear'></div>";
			//echo $dir."<br />";
			if (is_dir($dir)) {
				echo "<div class='wtw-objectcontainer'><div class='wtw-objectfile'>File List</div><div class='wtw-objectfolder'>";
				if ($dh = opendir($dir)) {
					while (($zfile = readdir($dh)) !== false) {
						if ($zfile != '.' && $zfile != '..') {
							if ($zstock != 1) {
								echo "<img src='/content/system/images/close2.png' alt='Delete' title='Delete' style='width:24px;height:auto;float:right;right-margin:10px;cursor:pointer;' onclick=\"dGet('wtw_tdeletefile').value='".$zfile."';WTW.hide('wtw_uploadbutton');WTW.showInline('wtw_deletefile');WTW.showInline('wtw_canceldelete');\" />";
							}
							if ($zfile == $zrow["objectfile"]) {
								$zobjectfile = $zfile;
								echo "<div class='wtw-floatright'>Primary</div><strong>".$zfile."</strong><br /><div class='wtw-clear'></div>";
							} else {
								echo "<div>".$zfile."</div><br /><div class='wtw-clear'></div>";
							}
						}
					}
					closedir($dh);
				}
				if ($zstock != 1) {
					echo "<br /><br /><div id='wtw_uploadbutton' class='wtw-greenbutton' style='width:318px;' onclick=\"dGet('wtw_buploadcommunityimage').click();\">Upload or Replace File</div>";
					echo "<div id='wtw_deletefile' class='wtw-redbutton' style='width:150px;display:none;visibility:hidden;text-align:center;margin-right:13px;cursor:pointer;' onclick=\"dGet('wtw_submit').click();\">Delete File</div><div id='wtw_canceldelete' class='wtw-yellowbutton' style='width:150px;display:none;visibility:hidden;text-align:center;cursor:pointer;' onclick=\"dGet('wtw_tdeletefile').value='';WTW.hide('wtw_deletefile');WTW.hide('wtw_canceldelete');WTW.show('wtw_uploadbutton');\">Cancel</div>";
				}
				echo "</div></div>";
			}
		}
		if (count($zresults) == 0) {
			echo "<h1 style='color:red;margin-left:20px;'>3D Object not found</h1>";
		}
		if ($zstock == 0) { 
			echo "<div class='wtw-clear'></div><div class='wtw-objectcontainer'><div class='wtw-objectfile'>Animations</div><div class='wtw-objectfolder'>";
			$zresults = $wtwiframes->query("
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
				where a1.uploadobjectid='".$zuploadobjectid."'
					and a1.userid='".$wtwiframes->userid."'
					and a1.deleted=0
				order by sorder, a1.moldevent, a1.animationname, a1.objectanimationid;");
			foreach ($zresults as $zrow) {
				echo "<img src='/content/system/images/close2.png' alt='Delete' title='Delete' style='width:24px;height:auto;float:right;right-margin:10px;cursor:pointer;' onclick=\"dGet('wtw_tdeleteanimation').value='".$zrow["objectanimationid"]."';WTW.showInline('wtw_deleteanimation');WTW.showInline('wtw_canceldeleteanimation');\" />";
				echo "<img src='/content/system/images/edit.png' alt='Edit Animation' title='Edit Animation' style='width:24px;height:auto;float:right;right-margin:10px;cursor:pointer;' onclick=\"window.location.href='uploadedfiledetails.php?uploadobjectid=".$zuploadobjectid."&objectanimationid=".$zrow["objectanimationid"]."';\" />";
				$moldevent = '';
				if (empty($zrow["moldevent"]) || !isset($zrow["moldevent"])) {
					$moldevent = '';
				} else {
					$moldevent = ": <strong>".$zrow["moldevent"]."</strong>";
				}
				echo "<div>".$zrow["animationname"].$moldevent."</div><br /><div class='wtw-clear'></div>";
			}
			echo "<br /><br /><div id='wtw_addanimation' class='wtw-greenbutton' style='width:318px;' onclick=\"addAnimation();\">Add Animation</div>";
			echo "<div id='wtw_deleteanimation' class='wtw-redbutton' style='width:150px;display:none;visibility:hidden;text-align:center;margin-right:13px;cursor:pointer;' onclick=\"dGet('wtw_submit').click();\">Delete Animation</div><div id='wtw_canceldeleteanimation' class='wtw-yellowbutton' style='width:150px;display:none;visibility:hidden;text-align:center;cursor:pointer;' onclick=\"dGet('wtw_tdeleteanimation').value='';WTW.hide('wtw_deleteanimation');WTW.hide('wtw_canceldeleteanimation');\">Cancel</div>";
			echo "</div></div>";
			$animationname = '';
			$moldevent = '';
			$moldnamepart = '';
			$startframe = '0';
			$endframe = '0';
			$animationloop = '0';
			$speedratio = '1.00';
			$animationendscript = '';
			$animationendparameters = '';
			$stopcurrentanimations = '0';
			$zsoundid = '';
			$zsoundpath = '';
			$zsoundname = '';
			$zsoundmaxdistance = '100.00';
			$addstyle="style='display:none;visibility:hidden;'";
			if (isset($zobjectanimationid) && !empty($zobjectanimationid)) {
				$zresults = $wtwiframes->query("
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
						and a1.userid='".$wtwiframes->userid."'
						and a1.deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$animationname = $zrow['animationname'];
					$moldevent = $zrow['moldevent'];
					$moldnamepart = $zrow['moldnamepart'];
					$startframe = $zrow['startframe'];
					$endframe = $zrow['endframe'];
					$animationloop = $zrow['animationloop']."";
					$speedratio = $zrow['speedratio'];
					$animationendscript = $zrow['animationendscript'];
					$animationendparameters = $zrow['animationendparameters'];
					$stopcurrentanimations = $zrow['stopcurrentanimations']."";
					$addstyle="style='display:block;visibility:visible;'";
					$zsoundid = $zrow['soundid'];
					$zsoundpath = $zrow['soundpath'];
					$zsoundname = $zrow['soundname'];
					$zsoundmaxdistance = $zrow['soundmaxdistance'];
				}

			}
 ?>
			<div class='wtw-clear'></div>
			<div id='wtw_addanimationdiv' class='wtw-objectcontainer' <?php echo $addstyle; ?>><div id='wtw_addanimationtitle' class='wtw-objectfile'>Edit Animation</div>
				<div class='wtw-objectfolder'>
					<div><h3 class="wtw-black">Animation Name</h3><div class="wtw-examplenote">(JavaScript Function Name you can call in code)</div>
						<input id="wtw_tanimationname" name="wtw_tanimationname" type="text" value="<?php echo $animationname; ?>" maxlength="255" />
					</div>
					<div><h3 class="wtw-black">JavaScript Event</h3>
						<select id="wtw_tmoldevent" name="wtw_tmoldevent">
							<option value="" <?php if ($moldevent=='') { echo 'selected'; } ?>>none</option>
							<option value="onload" <?php if ($moldevent=='onload') { echo 'selected'; } ?>>onload</option>
							<option value="onclick" <?php if ($moldevent=='onclick') { echo 'selected'; } ?>>onclick</option>
							<option value="onclicktoggle" <?php if ($moldevent=='onclicktoggle') { echo 'selected'; } ?>>onclick-toggle</option>
							<option value="onmouseover" <?php if ($moldevent=='onmouseover') { echo 'selected'; } ?>>onmouseover</option>
							<option value="onmouseout" <?php if ($moldevent=='onmouseout') { echo 'selected'; } ?>>onmouseout</option>
							<option value="" style="background-color:yellow;">--- Avatar Movements ---</option>
							<option value="onwait" <?php if ($moldevent=='onwait') { echo 'selected'; } ?>>Idle or Waiting</option>
							<option value="onwalk" <?php if ($moldevent=='onwalk') { echo 'selected'; } ?>>Walk</option>
							<option value="onwalkbackwards" <?php if ($moldevent=='onwalkbackwards') { echo 'selected'; } ?>>Walk Backwards</option>
							<option value="onjump" <?php if ($moldevent=='onjump') { echo 'selected'; } ?>>Jump</option>
							<option value="onrun" <?php if ($moldevent=='onrun') { echo 'selected'; } ?>>Run</option>
							<option value="onsit" <?php if ($moldevent=='onsit') { echo 'selected'; } ?>>Stand-to-Sit</option>
							<option value="onstand" <?php if ($moldevent=='onstand') { echo 'selected'; } ?>>Sit-to-Stand</option>
							<option value="onstrafeleft" <?php if ($moldevent=='onstrafeleft') { echo 'selected'; } ?>>Strafe Left</option>
							<option value="onstraferight" <?php if ($moldevent=='onstraferight') { echo 'selected'; } ?>>Strafe Right</option>
							<option value="onturnleft" <?php if ($moldevent=='onturnleft') { echo 'selected'; } ?>>Turn Left</option>
							<option value="onturnright" <?php if ($moldevent=='onturnright') { echo 'selected'; } ?>>Turn Right</option>
							<option value="onpickup" <?php if ($moldevent=='onpickup') { echo 'selected'; } ?>>Pick Up</option>
							<option value="onputdown" <?php if ($moldevent=='onputdown') { echo 'selected'; } ?>>Put Down</option>
						</select>
					</div>
					<div><h3 class="wtw-black">Mesh Name</h3><div class="wtw-examplenote">(name of sub-mesh of 3D Object or leave blank for full 3D Object)</div>
						<input id="wtw_tmoldnamepart" name="wtw_tmoldnamepart" type="text" value="<?php echo $moldnamepart; ?>" maxlength="255" />
					</div>
					<div><h3 class="wtw-black">Start Frame</h3>
						<input id="wtw_tstartframe" name="wtw_tstartframe" type="text" value="<?php echo $startframe; ?>" maxlength="15" />
					</div>
					<div><h3 class="wtw-black">End Frame</h3>
						<input id="wtw_tendframe" name="wtw_tendframe" type="text" value="<?php echo $endframe; ?>" maxlength="15" />
					</div><br />
					<input type="checkbox" id="wtw_tanimationloop" name="wtw_tanimationloop" class="wtw-smallprint" value="1" onchange="" <?php if ($animationloop == '1') { echo 'checked';} ?> /><span style="color:#000000;"> Loop Animation</span><br /><br />
					<div id="wtw_fileadvancedoptslink" onclick="WTW.toggleAdvanced(this, 'wtw_fileadvancedopts');" class="wtw-showhideadvancedblack">-- Show Advanced Options --</div>
					<div id="wtw_fileadvancedopts" style="display:none;visibility:hidden;">
						<div><h3 class="wtw-black">Speed Ratio<div class="wtw-examplenote">(Original speed: 1.00)</div></h3>
							<input id="wtw_tspeedratio" name="wtw_tspeedratio" type="text" value="<?php echo $speedratio; ?>" maxlength="15" />
						</div>
						<div><h3 class="wtw-black">Animation End Script</h3><div class="wtw-examplenote">(optional JavaScript Function to play when animation ends)</div>
							<input id="wtw_tanimationendscript" name="wtw_tanimationendscript" type="text" value="<?php echo $animationendscript; ?>" maxlength="255" />
						</div>
						<div><h3 class="wtw-black">Animation End Script Parameters</h3><div class="wtw-examplenote">(comma seperated values or blank)</div>
							<input id="wtw_tanimationendparameters" name="wtw_tanimationendparameters" type="text" value="<?php echo $animationendparameters; ?>" maxlength="255" />
						</div><br />
						<input type="checkbox" id="wtw_tstopcurrentanimations" name="wtw_tstopcurrentanimations" class="wtw-smallprint" value="1" onchange="" <?php if ($stopcurrentanimations == '1') { echo 'checked';} ?> /><span style="color:#000000;"> Stop Current Animation when played</span><br /><br />
						<img id="wtw_objectsoundicon" src="/content/system/images/3dsound.png" class="wtw-adminiconimage" alt="<?php echo $zsoundname; ?>" title="<?php echo $zsoundname; ?>" /> &nbsp;
						<div id="wtw_objectselectedsound"><?php echo $zsoundname; ?></div>
						<div class='wtw-yellowbutton' style='width:150px;text-align:center;cursor:pointer;' onclick="parent.WTW.openFullPageForm('medialibrary','audio','objectsound','wtw_tobjectsoundid','wtw_tobjectsoundpath','wtw_tobjectsoundicon');">Select Sound</div>
						<div><h3 class="wtw-black">Sound Max Distance<div class="wtw-examplenote">(Linear Default: 100)</div></h3>
							<input id="wtw_tobjectmaxdistance" name="wtw_tobjectmaxdistance" type="text" value="<?php echo $zsoundmaxdistance; ?>" maxlength="15" />
						</div>
					</div><br /><br />
					<div class='wtw-greenbutton' style='width:318px;' onclick="checkObjectAnimationId();">Save Animation</div><br /><br />
					<div class='wtw-redbutton' style='width:150px;text-align:center;margin-right:13px;cursor:pointer;' onclick="dGet('wtw_tdeleteanimation').value=dGet('wtw_tobjectanimationid').value;dGet('wtw_submit').click();">Delete Animation</div><div id='wtw_canceldeleteanimation' class='wtw-yellowbutton' style='width:150px;text-align:center;cursor:pointer;' onclick="WTW.hide('wtw_addanimationdiv');">Cancel</div>
				</div>
			</div>
<?php 	}
	} ?>		
		</div>
		<div class='wtw-clear'></div><div class='wtw-yellowbutton' style='margin-left:20px;' onclick="window.parent.WTW.setImageMenu(4);">Close</div>		
		<input type="hidden" id="wtw_tobjectfolder" name="wtw_tobjectfolder" value="<?php echo $zobjectfolder; ?>" />
		<input type="hidden" id="wtw_tobjectfile" name="wtw_tobjectfile" value="<?php echo $zobjectfile; ?>" />
		<input type="hidden" id="wtw_tdeletefile" name="wtw_tdeletefile" value="" />
		<input type="hidden" id="wtw_tdeleteanimation" name="wtw_tdeleteanimation" value="" />
		<input type="hidden" id="wtw_tobjectanimationid" name="wtw_tobjectanimationid" value="<?php echo $zobjectanimationid; ?>" />
		<input type="hidden" id="wtw_tobjectsoundid" name="wtw_tobjectsoundid" value="<?php echo $zsoundid; ?>" />
		<input type="hidden" id="wtw_tobjectsoundpath" name="wtw_tobjectsoundpath" value="<?php echo $zsoundpath; ?>" />
	</form>
</body>
<script type="text/javascript">
	function checkObjectAnimationId() {
		try {
			if (dGet('wtw_tobjectanimationid').value == '') {
				dGet('wtw_tobjectanimationid').value = WTW.getRandomString(16);
			}
			dGet('wtw_submit').click();
		} catch(ex) {}
	}
	function addAnimation() {
		try {
			dGet('wtw_tobjectanimationid').value = WTW.getRandomString(16);
			dGet('wtw_tanimationname').value = '';
			dGet('wtw_tmoldevent').selectedIndex = 0;
			dGet('wtw_tmoldnamepart').value = '';
			dGet('wtw_tstartframe').value = '';
			dGet('wtw_tendframe').value = '';
			dGet('wtw_tanimationloop').checked = false;
			dGet('wtw_tspeedratio').value = '1.00';
			dGet('wtw_tanimationendscript').value = '';
			dGet('wtw_tanimationendparameters').value = '';
			dGet('wtw_tstopcurrentanimations').checked = false;
			dGet('wtw_addanimationtitle').innerHTML = 'Add Animation';
			dGet('wtw_tobjectmaxdistance').value = '1.00';
			dGet('wtw_objectselectedsound').innerHTML = '';
			dGet('wtw_objectsoundicon').alt = '';
			dGet('wtw_objectsoundicon').title = '';
			dGet('wtw_tobjectsoundid').value = '';
			dGet('wtw_tobjectsoundpath').value = '';
			WTW.show('wtw_addanimationdiv');
			dGet('wtw_tanimationname').focus();
		} catch(ex) {}
	}

	window.onload = function() {
<?php 	if ($zstock == 1) { ?>
			window.parent.WTW.hide('wtw_bstartimageupload');
<?php 	} else { ?>
			window.parent.WTW.show('wtw_bstartimageupload');
<?php 	} 
		if(isset($_GET["objectanimationid"]) && !empty($_GET["objectanimationid"])) { ?>
			dGet('wtw_tanimationname').focus();
<?php	} ?>
	}
</script>
</html>	
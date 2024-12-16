<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides multiple 3D Communities information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/communities.php");

	/* get values from querystring or session */
	$zuserid = $wtwconnect->userid;
	$zfilter = $wtwconnect->getVal('filter','mine');

	/* check user for global roles with access */
	$hasaccess = false;
	if ($zfilter == 'all') {
		$zroles = $wtwconnect->getUserRoles($zuserid);
		foreach ($zroles as $zrole) {
			if (strtolower($zrole['rolename']) == 'admin' || strtolower($zrole['rolename']) == 'architect' || strtolower($zrole['rolename']) == 'developer' || strtolower($zrole['rolename']) == 'graphics artist') {
				$hasaccess = true;
			}
		}
	}
	/* select webs by userid */
	$zresults = array();


	$zcontentpath = '';
	if (defined('wtw_contentpath')) {
		$zcontentpath = wtw_contentpath;
	}
	$zsearch = '';
	$zwebtype = '';
	$zwebtypes = '';
	$zlist = '';
	$zversionid = '';
	$zsorder = '';
	$zpermissions = "";
	if(isset($_GET['search']) && !empty($_GET['search'])) {
		$zsearch = $_GET['search'];
	}
	if(isset($_GET['webtype']) && !empty($_GET['webtype'])) {
		$zwebtype = $_GET['webtype'];
	}
	if(isset($_GET['list']) && !empty($_GET['list'])) {
		$zlist = $_GET['list'];
	}
	if(isset($_GET['versionid']) && !empty($_GET['versionid'])) {
		$zversionid = $_GET['versionid'];
	}
	
	$zsearch = str_replace(" ","%",$zsearch);
	
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
		case "avatar":
			$zwebtypes = "avatars";
			break;
		case "plugin":
			$zwebtypes = "plugins";
			break;
	}
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	if ($zwebtype == 'avatar') {
		$zpermissions = " and user1.userid='".$zuserid."' ";
		if ($zfilter == 'all' && $hasaccess) {
			$zpermissions = '';
		}
		if (isset($zlist) && !empty($zlist)) {
			switch ($zlist) {
				case "latest":
					$zsorder = "t1.createdate desc, t1.versionid, t1.updatedate desc, t1.displayname, t1.templatename, t1.".$zwebtype."id";
					break;
				case "version":
					$zsorder = "t1.createdate desc, t1.versionid, t1.updatedate desc, t1.displayname, t1.templatename, t1.".$zwebtype."id";
					break;
				default:
					$zsorder = "t1.createdate desc, t1.versionid, t1.updatedate desc, t1.displayname, t1.templatename, t1.".$zwebtype."id";
					break;
			}
		} else {
			$zsorder = "t1.displayname, t1.templatename, t1.createdate desc, t1.updatedate desc, t1.".$zwebtype."id";
		}
		if ($zlist == 'version' && isset($zversionid) && !empty($zversionid)) {
			$zsql = "select distinct t1.*, 
						t1.".$zwebtype."id as webid,
						t1.displayname as webname,
						u1.filepath as imageurl,
						user1.displayname as username,
						user1.userid,
						user1.email,
						user2.displayname as createusername,
						user2.email as createemail,
						t1.displayname as avatarname,
						m1.versionmax
					from wtw_".$zwebtypes." t1
						left join wtw_uploads u1
						on t1.snapshotid = u1.uploadid
						left join wtw_users user1
						on t1.updateuserid = user1.userid
						left join wtw_users user2
						on t1.createuserid = user2.userid
						left join (select versionid, max(versionorder) as versionmax from wtw_".$zwebtypes." group by versionid) m1
						on t1.versionid=m1.versionid
					where t1.deleted=0 
						and t1.versionid='".$zversionid."'
						".$zpermissions."
					order by ".$zsorder.";";
		} else if (!empty($zsearch) && isset($zsearch) && $zsearch != '*' && $zsearch != '%') {
			$zsql = "select distinct t1.*, 
					t1.".$zwebtype."id as webid,
					t1.displayname as webname,
					u1.filepath as imageurl,
					user1.displayname as username,
					user1.userid,
					user1.email,
					user2.displayname as createusername,
					user2.email as createemail,
                    t1.displayname as avatarname,
                    m1.versionmax
				from wtw_".$zwebtypes." t1
					left join wtw_uploads u1
					on t1.snapshotid = u1.uploadid
					left join wtw_users user1
					on t1.updateuserid = user1.userid
					left join wtw_users user2
					on t1.createuserid = user2.userid
					left join (select versionid, max(versionorder) as versionmax from wtw_".$zwebtypes." group by versionid) m1
                    on t1.versionid=m1.versionid
				where t1.deleted=0 
					and (t1.displayname like '%".$zsearch."%'
					or t1.".$zwebtype."id like '%".$zsearch."%'
					or t1.templatename like '%".$zsearch."%'
					or t1.tags like '%".$zsearch."%'
					or t1.versiondesc like '%".$zsearch."%'
					or t1.versionid like '%".$zsearch."%'
					or t1.description like '%".$zsearch."%')
					and t1.deleted=0
					".$zpermissions."
				order by ".$zsorder.";";
		} else {
			$zsql = "select distinct t1.*, 
						t1.".$zwebtype."id as webid,
						t1.displayname as webname,
						u1.filepath as imageurl,
						user1.displayname as username,
						user1.userid,
						user1.email,
						user2.displayname as createusername,
						user2.email as createemail,
						t1.displayname as avatarname,
						m1.versionmax
					from wtw_".$zwebtypes." t1
						left join wtw_uploads u1
						on t1.snapshotid = u1.uploadid
						left join wtw_users user1
						on t1.updateuserid = user1.userid
						left join wtw_users user2
						on t1.createuserid = user2.userid
						left join (select versionid, max(versionorder) as versionmax from wtw_".$zwebtypes." group by versionid) m1
						on t1.versionid=m1.versionid
					where t1.deleted=0 
						".$zpermissions."
					order by ".$zsorder.";";
		}
		
	} else if ($zwebtype == 'plugin') {
		$zpermissions = " and user1.userid='".$zuserid."' ";
		if ($zfilter == 'all' && $hasaccess) {
			$zpermissions = '';
		}
		if (isset($zlist) && !empty($zlist)) {
			switch ($zlist) {
				case "latest":
					$zsorder = "t1.createdate desc, t1.templatename, t1.pluginname, t1.pluginid";
					break;
				default:
					$zsorder = "t1.createdate desc, t1.templatename, t1.pluginname, t1.pluginid";
					break;
			}
		} else {
			$zsorder = "t1.templatename, t1.pluginname, t1.versionorder desc, t1.createdate desc, t1.pluginid";
		}
		$zsql = "select distinct t1.*, 
					t1.".$zwebtype."id as webid,
					t1.".$zwebtype."name as webname,
					user1.displayname as username,
					user1.email,
					user2.displayname as createusername,
					user2.email as createemail,
					'' as snapshotid
				from wtw_".$zwebtypes." t1
					left join wtw_users user1
					on t1.userid = user1.userid
					left join wtw_users user2
					on t1.createuserid = user2.userid
				where t1.deleted=0 
					".$zpermissions."
				order by ".$zsorder.";";

		if (!empty($zsearch) && isset($zsearch) && $zsearch != '*' && $zsearch != '%') {
			$zsql = "select distinct t1.*,
						t1.".$zwebtype."id as webid,
						t1.".$zwebtype."name as webname,
						user1.displayname as username,
						user1.email,
						user2.displayname as createusername,
						user2.email as createemail,
						'' as snapshotid
					from wtw_".$zwebtypes." t1
						left join wtw_users user1
						on t1.userid = user1.userid
						left join wtw_users user2
						on t1.createuserid = user2.userid
					where t1.deleted=0 
						and (t1.templatename like '%".$zsearch."%'
						or t1.pluginname like '%".$zsearch."%'
						or t1.pluginid like '%".$zsearch."%'
						or t1.description like '%".$zsearch."%')
						".$zpermissions."
					order by ".$zsorder.";";
		}		
	} else {
		$zpermissions = " and t1.userid='".$zuserid."' ";
		if ($zfilter == 'all' && $hasaccess) {
			$zpermissions = '';
		}
		if (isset($zlist) && !empty($zlist)) {
			switch ($zlist) {
				case "latest":
					$zsorder = "t1.createdate desc, t1.versionid, t1.updatedate desc, t1.".$zwebtype."name, t1.templatename, t1.".$zwebtype."id";
					break;
				case "version":
					$zsorder = "t1.createdate desc, t1.versionid, t1.updatedate desc, t1.".$zwebtype."name, t1.templatename, t1.".$zwebtype."id";
					break;
				default:
					$zsorder = "t1.createdate desc, t1.versionid, t1.updatedate desc, t1.".$zwebtype."name, t1.templatename, t1.".$zwebtype."id";
					break;
			}
		} else {
			$zsorder = "t1.".$zwebtype."name, t1.createdate desc, t1.".$zwebtype."id";
		}

		if ($zlist == 'version' && isset($zversionid) && !empty($zversionid)) {

			$zsql = "select distinct t1.*, 
						t1.".$zwebtype."id as webid,
						t1.".$zwebtype."name as webname,
						u1.filepath as imageurl,
						user1.displayname as username,
						user1.email,
						user2.displayname as createusername,
						user2.email as createemail
						m1.versionmax
					from wtw_".$zwebtypes." t1
						left join wtw_uploads u1
						on t1.snapshotid = u1.uploadid
						left join wtw_users user1
						on t1.userid = user1.userid
						left join wtw_users user2
						on t1.createuserid = user2.userid
						left join (select versionid, max(versionorder) as versionmax from wtw_".$zwebtypes." group by versionid) m1
						on t1.versionid=m1.versionid
					where t1.deleted=0 
						and t1.versionid='".$zversionid."'
						".$zpermissions."
					order by ".$zsorder.";";
		
		} else if (!empty($zsearch) && isset($zsearch) && $zsearch != '*' && $zsearch != '%') {
			if (isset($zlist) && !empty($zlist)) {
				switch ($zlist) {
					case "latest":
						$zsorder = "t1.createdate desc, t1.versionid, t1.updatedate desc, t1.".$zwebtype."name, t1.templatename, t1.".$zwebtype."id";
						break;
					default:
						$zsorder = "t1.createdate desc, t1.versionid, t1.updatedate desc, t1.".$zwebtype."name, t1.templatename, t1.".$zwebtype."id";
						break;
				}
			} else {
				$zsorder = "t1.createdate desc, t1.".$zwebtype."name, t1.templatename, t1.".$zwebtype."id";
			}
			$zsql = "select distinct t1.*,
					t1.".$zwebtype."id as webid,
					t1.".$zwebtype."name as webname,
					u1.filepath as imageurl,
					user1.displayname as username,
					user1.email,
					user2.displayname as createusername,
					user2.email as createemail,
                    m1.versionmax
				from wtw_".$zwebtypes." t1
					left join wtw_uploads u1
					on t1.snapshotid = u1.uploadid
					left join wtw_users user1
					on t1.userid = user1.userid
					left join wtw_users user2
					on t1.createuserid = user2.userid
					left join (select versionid, max(versionorder) as versionmax from wtw_".$zwebtypes." group by versionid) m1
                    on t1.versionid=m1.versionid
				where (t1.".$zwebtype."name like '%".$zsearch."%'
					or t1.".$zwebtype."id like '%".$zsearch."%'
					or t1.templatename like '%".$zsearch."%'
					or t1.tags like '%".$zsearch."%'
					or t1.versiondesc like '%".$zsearch."%'
					or t1.versionid like '%".$zsearch."%'
					or t1.description like '%".$zsearch."%')
					and t1.deleted=0
					".$zpermissions."
				order by ".$zsorder.";";
		} else {
			$zsql = "select distinct t1.*, 
						t1.".$zwebtype."id as webid,
						t1.".$zwebtype."name as webname,
						u1.filepath as imageurl,
						user1.displayname as username,
						user1.email,
						user2.displayname as createusername,
						user2.email as createemail,
						m1.versionmax
					from wtw_".$zwebtypes." t1
						left join wtw_uploads u1
						on t1.snapshotid = u1.uploadid
						left join wtw_users user1
						on t1.userid = user1.userid
						left join wtw_users user2
						on t1.createuserid = user2.userid
						left join (select versionid, max(versionorder) as versionmax from wtw_".$zwebtypes." group by versionid) m1
						on t1.versionid=m1.versionid
					where t1.deleted=0
						".$zpermissions."
					order by ".$zsorder.";";
		}
	}

	$i = 0;
	$zresponse = array();
	
	$zresults = $wtwconnect->query($zsql);

	foreach ($zresults as $zrow) {
		$zimageurl = $zrow["imageurl"];
		if ($zwebtype == 'avatar') {
			$zimageurl = "/content/uploads/avatars/".$zrow[$zwebtype."id"]."/snapshots/defaultavatar.png";
			if (file_exists($wtwconnect->rootpath.$zimageurl) == false) {
				$zimageurl = "https://3dnet.walktheweb.com/content/uploads/avatars/".$zrow[$zwebtype."id"]."/snapshots/defaultavatar.png";
			}
		}
		/* get size of web */
		$zdirsize = 0;
		$zfileind = 0;
		$zfilelist = array();
		$zwebpath = $zcontentpath.'/uploads/'.$zwebtypes.'/'.$zrow[$zwebtype."id"];
		if (file_exists($zwebpath)) {
			$zdirsize = $wtwconnect->dirSize($zwebpath);
			$zfilelist = $wtwconnect->getFileList($zwebpath);
			$zfileind = count($zfilelist) - 1;
		}
		
		/* check for child webs */
		$zresults2 = $wtwconnect->query("
			select childwebtype, childwebid
			from wtw_connectinggrids
			where deleted=0
				and parentwebtype='".$zwebtype."'
				and parentwebid='".$zrow[$zwebtype."id"]."'
			group by childwebtype, childwebid;
		");
		foreach ($zresults2 as $zrow2) {
			$zwebtypes2 = 'communities';
			switch ($zrow2["childwebtype"]) {
				case 'building':
					$zwebtypes2 = 'buildings';
					break;
				case 'thing':
					$zwebtypes2 = 'things';
					break;
			}
			$zfilelist2 = array();
			$zwebpath2 = $zcontentpath.'/uploads/'.$zwebtypes2.'/'.$zrow2["childwebid"];
			if (file_exists($zwebpath2)) {
				$zdirsize += $wtwconnect->dirSize($zwebpath2);
				$zfilelist2 = $wtwconnect->getFileList($zwebpath2);
			}
			foreach ($zfilelist2 as $zfile2) {
				$zfilelist[$zfileind] = array(
					'filename' => $zfile2["filename"],
					'filepath' => $zfile2["filepath"],
					'filesize' => $zfile2["filesize"],
					'downloaded' => '0'
				);
				$zfileind += 1;
			}
			
			/* check for child webs of child webs (community with building with things) */
			$zresults3 = $wtwconnect->query("
				select childwebtype, childwebid
				from wtw_connectinggrids
				where deleted=0
					and parentwebtype='".$zrow2["childwebtype"]."'
					and parentwebid='".$zrow2["childwebid"]."'
				group by childwebtype, childwebid;
			");
			foreach ($zresults3 as $zrow3) {
				$zwebtypes3 = 'communities';
				switch ($zrow3["childwebtype"]) {
					case 'building':
						$zwebtypes3 = 'buildings';
						break;
					case 'thing':
						$zwebtypes3 = 'things';
						break;
				}
				$zfilelist3 = array();
				$zwebpath3 = $zcontentpath.'/uploads/'.$zwebtypes3.'/'.$zrow3["childwebid"];
				if (file_exists($zwebpath3)) {
					$zdirsize += $wtwconnect->dirSize($zwebpath3);
					$zfilelist3 = $wtwconnect->getFileList($zwebpath3);
				}
				foreach ($zfilelist3 as $zfile3) {
					$zfilelist[$zfileind] = array(
						'filename' => $zfile3["filename"],
						'filepath' => $zfile3["filepath"],
						'filesize' => $zfile3["filesize"],
						'downloaded' => '0'
					);
					$zfileind += 1;
				}
			}
		}
		
		$zresponse[$i] = array(
			$zwebtype.'id' => $zrow[$zwebtype."id"],
			$zwebtype.'name' => $zrow[$zwebtype."name"],
			'webid' => $zrow["webid"],
			'webname' => $zrow["webname"],
			'templatename' => $zrow["templatename"],
			'description' => $zrow["description"],
			'versionid' => $zrow["versionid"],
			'version' => $zrow["version"],
			'versionorder' => $zrow["versionorder"],
			'versiondesc' => $zrow["versiondesc"],
			'versionmax' => $zrow["versionmax"],
			'dirsize' => $zdirsize,
			'filecount' => count($zfilelist),
			'filelist' => $zfilelist,
			'tags' => $zrow["tags"],
			'snapshotid' => $zrow["snapshotid"],
			'imageurl' => $zimageurl,
			'userid' => $zrow["userid"],
			'createemail' => $zrow["createemail"],
			'email' => $zrow["email"],
			'createdisplayname' => $zrow["createusername"],
			'displayname' => $zrow["username"],
			'createdate' => $zrow["createdate"],
			'updatedate' => $zrow["updatedate"]
		);
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
    $wtwconnect->serror("connect-webs.php: ".$e->getMessage());
}
?>

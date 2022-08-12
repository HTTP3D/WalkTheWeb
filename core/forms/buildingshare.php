<!-- admin menu form for Sharing a Building -->
<div id="wtw_adminmenu9b" class="wtw-hide">
	<h2>Template Name</h2>
	<input type="text" id="wtw_tsharebuildtempname" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" />
	<br /><br />
	<h2>Description</h2>
	<textarea id="wtw_tsharebuilddescription" rows="4" onclick="WTW.checkKey(this, 'safetext', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'safetext', 0, 0);" onblur="WTW.checkKey(this, 'safetext', 0, 1);"></textarea>
	<br /><br />
	<h2>Search Category Tags</h2>
	<input type="text" id="wtw_tsharebuildtags" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
	<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;">Example: business, store, house, single floor, blue, wood, etc</div>
	<br /><br />
	<div id="wtw_bsnapshotbuilding" class='wtw-menulevel2' onclick="WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/buildings/' + dGet('wtw_tbuildingid').value + '/snapshots/', 'defaultbuilding.png');" style="cursor: pointer;">Set Default Snapshot</div><br />
	<img id="wtw_defaultbuildingsnapshot" class="wtw-snapshot" />
	<br /> 
	<div id="wtw_sharebuildingresponse" style="font-size:1.5em;color:green;"></div><br />
	<br /> 
	
	<h2>Initial Share or Update</h2>
	<div style="text-align:left;margin-left:40px;color:#ffffff;cursor:pointer;" onclick="dGet('wtw_tsharebuildingoriginal').click();">
		<input type="radio" id="wtw_tsharebuildingoriginal" name="wtw_tsharetype" value="initial" onchange="WTW.changeWebVersion('building');" /> Initial Share<br />
	</div>
	<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;">You created the 3D Building and want to Share it.</div>
	<br />
	<div style="text-align:left;margin-left:40px;color:#ffffff;cursor:pointer;" onclick="dGet('wtw_tsharebuildingupdate').click();">
		<input type="radio" id="wtw_tsharebuildingupdate" name="wtw_tsharetype" value="update" onchange="WTW.changeWebVersion('building');" /> Update Share<br />
	</div>
	<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;text-align:left;">Optional: Only Available if this 3D Building was already Shared and you are the original creator.<br /><br />
		<div id="wtw_tsharebuildingdiv" class="wtw-hide">
			<div style="color:white;font-weight:bold;text-align:center;">Version: <input type="text" id="wtw_tsharebuildingversion" maxlength="255" value="1.0.0" /></div><br />
			Version Numbers are 3 numbers each separated by a period.<br /><br /><div style="margin-left:20px;">
				* First number is incremented for major changes or complete rebuilds.<br />
				* Second number is incremented for minor changes or additions.<br />
				* Third number is incremented for adjustments, texture changes, or bug fixes.<br />
				When the first or second number changes, the numbers to the right reset to 0. </div><br /><br />
			<div style="color:white;font-weight:bold;text-align:center;">Version Description: <input type="text" id="wtw_tsharebuildingversiondesc" maxlength="255" value="" /></div><br />
		</div>
	</div>
	<br />
</div>
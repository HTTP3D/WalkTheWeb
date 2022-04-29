<!-- admin menu form for Sharing a 3D Thing -->
<div id="wtw_adminmenu39b" class="wtw-hide">
	<h2>Template Name</h2>
	<input type="text" id="wtw_tsharethingtempname" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" />
	<br /><br />
	<h2>Description</h2>
	<textarea id="wtw_tsharethingdescription" rows="4" onclick="WTW.checkKey(this, 'safetext', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'safetext', 0, 0);" onblur="WTW.checkKey(this, 'safetext', 0, 1);"></textarea>
	<br /><br />
	<h2>Search Category Tags</h2>
	<input type="text" id="wtw_tsharethingtags" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
	<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;">Example: table, chair, display, lamp, etc</div>
	<br /><br />
	<div id="wtw_bsnapshotthing" class='wtw-menulevel2' onclick="WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/things/' + dGet('wtw_tthingid').value + '/snapshots/', 'defaultthing.png');" style="cursor: pointer;">Set Default Snapshot</div><br />
	<img id="wtw_defaultthingsnapshot" class="wtw-snapshot" />
	<br /> 
	<div id="wtw_sharethingresponse" style="font-size:1.5em;color:green;"></div><br />
	<br /> 

	<h2>Initial Share or Update</h2>
	<div style="text-align:left;margin-left:40px;color:#ffffff;cursor:pointer;" onclick="dGet('wtw_tsharethingoriginal').click();">
		<input type="radio" id="wtw_tsharethingoriginal" name="wtw_tsharetype" value="initial" onchange="WTW.changeWebVersion('thing');" /> Initial Share<br />
	</div>
	<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;">You created the 3D Thing and want to Share it.</div>
	<br />
	<div style="text-align:left;margin-left:40px;color:#ffffff;cursor:pointer;" onclick="dGet('wtw_tsharethingupdate').click();">
		<input type="radio" id="wtw_tsharethingupdate" name="wtw_tsharetype" value="update" /> Update Share<br />
	</div>
	<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;text-align:left;">Optional: Only Available if this 3D Thing was already Shared and you are the original creator.<br /><br />
		<div style="color:white;font-weight:bold;text-align:center;">Version: <input type="text" id="wtw_tsharethingversion" maxlength="255" value="1.0.0" /></div><br />
		Version Numbers are 3 numbers each separated by a period.<br /><br /><div style="margin-left:20px;">
			* First number is incremented for major changes or complete rebuilds.<br />
			* Second number is incremented for minor changes or additions.<br />
			* Third number is incremented for adjustments, texture changes, or bug fixes.<br />
			When the first or second number changes, the numbers to the right reset to 0. </div><br /><br />
		<div style="color:white;font-weight:bold;text-align:center;">Version Description: <input type="text" id="wtw_tsharethingversiondesc" maxlength="255" value="" /></div><br />
	</div>
	<br />
</div>

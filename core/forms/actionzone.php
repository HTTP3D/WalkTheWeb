	<div id="wtw_adminmenu20b" class="wtw-smallprint" style="display:none;visibility:hidden;">
		<select id="wtw_tactionzonetypelist" style="display:none;visibility:hidden;"></select>
		<h4>Action Zone Friendly Name</h4>
		<div class="wtw-onecol"> 
			<input type="text" id="wtw_tactionzonename" maxlength="255" class="wtw-secondcolcontent wtw-smallprintinput" style="width:250px;min-width:250px;" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" />
		</div><br /><br />
		<div id="wtw_actionzoneswingdoordiv">
			<div id="wtw_rotatedirectiondiv">
				<h4>Swing Direction</h4>
				<div class="wtw-onecol"> 
					<input type="button" id="wtw_bactionzonereverserotatedirection" class="wtw-smallprint" value="Reverse Swing Direction" onclick="WTW.reverserotatedirection();WTW.blockPassThrough();" style="cursor: pointer;" /><br />
					(Rotates X-Axis 180 Degrees)
					<select id="wtw_tactionzonerotatedirection" onchange="WTW.setNewActionZone();" class="wtw-secondcolcontent wtw-smallprintinput" style="display:none;visibility:hidden;">
						<option value="1">clockwise</option>
						<option value="-1">counter-clockwise</option>
					</select>
				</div><br />
			</div>
			<h4 id="wtw_swingdistancediv">Swing Distance</h4>
			<div class="wtw-onecol"> 
				<input type="text" id="wtw_tactionzonerotatedegrees" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" /><div id="wtw_swingdistancedegreesdiv" style="display:inline;"> &nbsp;Degrees</div>
				<input type="button" id="wtw_bazeditswing2" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotatedegrees', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_bazeditswing1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotatedegrees', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
			</div><br />
		</div>
		<div id="wtw_actionzonerotatespeeddiv">
			<h4>Rotation Speed</h4>
			<div class="wtw-onecol">
				<input type="text" id="wtw_tactionzonerotatespeed" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
				<input type="button" id="wtw_brotatespeed4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotatespeed', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_brotatespeed3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotatespeed', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_brotatespeed2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotatespeed', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_brotatespeed1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotatespeed', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</div><br />
		</div>
		<div id="wtw_actionzoneaxisdiv">
			<h4 id="wtw_axispositiontitle">Axis Position</h4>
			<div id="wtw_axispositionz" class="wtw-onecol" style="white-space:nowrap;">Position Z (left,-right)<br /> 
				<input type="text" id="wtw_taxispositionz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
				<input type="button" id="wtw_beditaxiszp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_taxispositionz', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxiszp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_taxispositionz', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxiszp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_taxispositionz', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxiszp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_taxispositionz', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</div><br />
			<div id="wtw_axispositionx" class="wtw-onecol">Position X (front,-back)<br />
				<input type="text" id="wtw_taxispositionx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
				<input type="button" id="wtw_beditaxisxp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_taxispositionx', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisxp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_taxispositionx', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisxp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_taxispositionx', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisxp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_taxispositionx', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
			</div><br />
			<div id="wtw_axispositiony" class="wtw-onecol">Position Y (up,-down)<br />
				<input type="text" id="wtw_taxispositiony" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
				<input type="button" id="wtw_beditaxisyp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_taxispositiony', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisyp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_taxispositiony', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisyp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_taxispositiony', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisyp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_taxispositiony', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
			</div><br />
			<h4 id="wtw_axisrotationtitle">Axis Rotation</h4>
			<div id="wtw_axisrotationz" class="wtw-onecol">Rotation Z (left,-right axis)<br /> 
				<input type="text" id="wtw_taxisrotationz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
				<input type="button" id="wtw_beditaxiszr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_taxisrotationz', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxiszr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_taxisrotationz', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxiszr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_taxisrotationz', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxiszr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_taxisrotationz', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
			</div><br />
			<div id="wtw_axisrotationx" class="wtw-onecol">Rotation X (front,-back axis)<br />
				<input type="text" id="wtw_taxisrotationx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
				<input type="button" id="wtw_beditaxisxr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_taxisrotationx', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisxr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_taxisrotationx', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisxr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_taxisrotationx', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisxr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_taxisrotationx', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
			</div><br />
			<div id="wtw_axisrotationy" class="wtw-onecol">Rotation Y (up,-down axis)<br />
				<input type="text" id="wtw_taxisrotationy" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
				<input type="button" id="wtw_beditaxisyr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_taxisrotationy', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisyr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_taxisrotationy', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisyr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_taxisrotationy', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxisyr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_taxisrotationy', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
			</div><br />
		</div>
		<div id="wtw_actionzonemovementdistancediv" style="display:none;visibility:hidden;">
			<h4>Slide Distance</h4>
			<div id="wtw_axisscalingz" class="wtw-onecol" style="white-space:nowrap;">Length<br /> 
				<input type="text" id="wtw_taxisscalingz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
				<input type="button" id="wtw_beditaxiszl4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_taxisscalingz', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxiszl3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_taxisscalingz', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxiszl2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_taxisscalingz', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditaxiszl1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_taxisscalingz', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();WTW.setNewActionZone();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</div><br />
		</div>
		<div id="wtw_actionzoneadvancedoptslink" onclick="WTW.toggleAdvanced(this, 'wtw_actionzoneadvancedopts');" class="wtw-showhideadvanced">-- Show Advanced Options --</div>
		<div id="wtw_actionzoneadvancedopts" style="display:none;visibility:hidden;">
			<br />
			<div id="wtw_copyaxletoactionzonediv">
				<h4>Action Zone Information</h4>
				<div class="wtw-onecol"> 
					<input type="checkbox" id="wtw_tcopyaxletoactionzone" class="wtw-secondcolcontent wtw-smallprintinput" onchange="WTW.setActionZonePosition();" /> Use Axle Position<br />for Action Zone
				</div><br />
			</div>
			<div id="wtw_actionzonesettingsdiv">
				<h4>Action Zone Position</h4>
				<div id="wtw_actionzoneposz" class="wtw-onecol">Zone Position Z (left,-right)<br /> 
					<input type="text" id="wtw_tactionzoneposz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
					<input type="button" id="wtw_beditactionzoneposzp4" class="wtw-smallprint" value="-1" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposz', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzoneposzp3" class="wtw-smallprint" value="-.01" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposz', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzoneposzp2" class="wtw-smallprint" value="+.01" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposz', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzoneposzp1" class="wtw-smallprint" value="+1" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposz', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
				</div><br />
				<div id="wtw_actionzoneposx" class="wtw-onecol">Zone Position X (front,-back)<br />
					<input type="text" id="wtw_tactionzoneposx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
					<input type="button" id="wtw_beditactionzoneposxp4" class="wtw-smallprint" value="-1" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposx', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzoneposxp3" class="wtw-smallprint" value="-.01" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposx', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzoneposxp2" class="wtw-smallprint" value="+.01" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposx', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzoneposxp1" class="wtw-smallprint" value="+1" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposx', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
				</div><br />
				<div id="wtw_actionzoneposy" class="wtw-onecol">Zone Position Y (up,-down)<br />
					<input type="text" id="wtw_tactionzoneposy" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
					<input type="button" id="wtw_beditactionzoneposyp4" class="wtw-smallprint" value="-1" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposy', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzoneposyp3" class="wtw-smallprint" value="-.01" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposy', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzoneposyp2" class="wtw-smallprint" value="+.01" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposy', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzoneposyp1" class="wtw-smallprint" value="+1" onmousedown="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.changeNumberValue('wtw_tactionzoneposy', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="dGet('wtw_tcopyaxletoactionzone').checked=false;WTW.blockPassThrough();" style="cursor: pointer;" />
				</div><br />
				<div id="wtw_actionzonesizediv">
					<h4>Action Zone Size</h4>
					<div id="wtw_actionzonescalingz" class="wtw-onecol">Zone Length Z (left,-right)<br /> 
						<input type="text" id="wtw_tactionzonescalingz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
						<input type="button" id="wtw_beditactionzonescalingzs4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingz', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditactionzonescalingzs3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingz', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditactionzonescalingzs2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingz', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditactionzonescalingzs1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingz', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					</div><br />
					<div id="wtw_actionzonescalingx" class="wtw-onecol">Zone Length X (front,-back)<br />
						<input type="text" id="wtw_tactionzonescalingx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
						<input type="button" id="wtw_beditactionzonescalingxs4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingx', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditactionzonescalingxs3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingx', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditactionzonescalingxs2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingx', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditactionzonescalingxs1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingx', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					</div><br />
					<div id="wtw_actionzonescalingy" class="wtw-onecol">Zone Length Y (up,-down)<br />
						<input type="text" id="wtw_tactionzonescalingy" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
						<input type="button" id="wtw_beditactionzonescalingys4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingy', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditactionzonescalingys3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingy', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditactionzonescalingys2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingy', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditactionzonescalingys1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tactionzonescalingy', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					</div><br />
				</div>
				<h4>Action Zone Rotation</h4>
				<div id="wtw_actionzonerotz" class="wtw-onecol">Zone Rotation Z (left,-right axis)<br /> 
					<input type="text" id="wtw_tactionzonerotz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
					<input type="button" id="wtw_beditactionzonerotzr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotz', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzonerotzr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotz', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzonerotzr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotz', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzonerotzr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotz', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				</div><br />
				<div id="wtw_actionzonerotx" class="wtw-onecol">Zone Rotation X (front,-back axis)<br />
					<input type="text" id="wtw_tactionzonerotx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
					<input type="button" id="wtw_beditactionzonerotxr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotx', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzonerotxr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotx', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzonerotxr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotx', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzonerotxr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tactionzonerotx', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				</div><br />
				<div id="wtw_actionzoneroty" class="wtw-onecol">Zone Rotation Y (up,-down axis)<br />
					<input type="text" id="wtw_tactionzoneroty" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewActionZone();" />
					<input type="button" id="wtw_beditactionzonerotyr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tactionzoneroty', -1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzonerotyr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tactionzoneroty', -.01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzonerotyr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tactionzoneroty', .01);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditactionzonerotyr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tactionzoneroty', 1);WTW.blockPassThrough(); return (false);" onmouseup="WTW.changeStop();" onclick="WTW.blockPassThrough();" style="cursor: pointer;" />
				</div>
			</div><br /><br />
			<div id="wtw_actionzoneavataranimationsdiv">
				<h4>Load Avatar Animations</h4>
				<div id="wtw_azavataranimations"></div><br />
				<div class="wtw-onecol">Select to Add:</div><br />
				<select id="wtw_tazavataranimationid"></select><br />
				<div class="wtw-menulevel0" onclick="WTW.saveAZAvatarAnimation();">Add Animation</div>
				<br /><br />
			</div>
			<div id="wtw_azvisibilitydistancediv">
				<h4>Action Zone Load Distance</h4>
				<select id="wtw_tazloadactionzoneid"></select>
			</div><br /><br />
		</div>
		<div id="wtw_actionzonepartsdiv">
			<div id="wtw_actionzonepartsdivlabel">
				<h2>Action Zone Parts<br />(3D Shapes included)</h2>
				Click to Remove<br />
			</div>
			<div id="wtw_attachactionzonediv">
				<h2>Trigger for Seat</h2>
				(Pick 3D Shape that you will select to have your avatar sit)<br />
			</div>
			<div id="wtw_actionzonepartslist"></div>
			<br />
			<div id="wtw_baddactionzonepart" class="wtw-menulevel0" onclick="WTW.selectAddActionZonePart(WTW.pick);">Pick Shape to Add</div>
		</div>
		<div id="wtw_azjavascriptdiv">
			<h4>Load JavaScript in Zone</h4>
			<div id="wtw_azjavascriptlinks" ></div>
			<div id="wtw_azjavascript" class="wtw-menulevel0" onclick="WTW.startUploadImage(this.innerHTML);return (false);">Upload JavaScript File</div>
		</div><br /><br />
	</div>

<!-- admin menu form for editing the first 3D Building placement, which sets the position, scaling, and rotation for the first 3D Building in a 3D Community that gets added by automated processes and wizards -->
	<div id="wtw_adminmenu28b" class="wtw-smallprint" style="display:none;visibility:hidden;">
		<h4>3D Building Position</h4>
		<div class="wtw-onecol" style="white-space:nowrap;">Position Z (left,-right)<br /> 
			<input type="text" id="wtw_tfirstbuildpositionz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setFirstBuilding();" />
			<input type="button" id="wtw_bfirstbuildingzp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositionz', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingzp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositionz', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingzp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositionz', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingzp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositionz', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		</div><br />
		<div class="wtw-onecol">Position X (front,-back)<br />
			<input type="text" id="wtw_tfirstbuildpositionx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setFirstBuilding();" />
			<input type="button" id="wtw_bfirstbuildingxp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositionx', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingxp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositionx', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingxp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositionx', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingxp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositionx', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Position Y (up,-down)<br />
			<input type="text" id="wtw_tfirstbuildpositiony" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setFirstBuilding();" />
			<input type="button" id="wtw_bfirstbuildingyp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositiony', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingyp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositiony', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingyp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositiony', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingyp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildpositiony', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<h4>3D Building Scale (Size)</h4>
		<div class="wtw-onecol">Scale Z (left,-right)<br /> 
			<input type="text" id="wtw_tfirstbuildscalingz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setFirstBuilding();" />
			<input type="button" id="wtw_bfirstbuildingzl4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingz', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingzl3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingz', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingzl2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingz', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingzl1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingz', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Scale X (front,-back)<br />
			<input type="text" id="wtw_tfirstbuildscalingx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setFirstBuilding();" />
			<input type="button" id="wtw_bfirstbuildingxl4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingx', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingxl3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingx', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingxl2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingx', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingxl1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingx', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Scale Y (up,-down)<br />
			<input type="text" id="wtw_tfirstbuildscalingy" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setFirstBuilding();" />
			<input type="button" id="wtw_bfirstbuildingyl4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingy', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingyl3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingy', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingyl2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingy', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingyl1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildscalingy', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<h4>3D Building Rotation</h4>
		<div class="wtw-onecol">Rotate Z (left,-right Axis)<br />
			<input type="text" id="wtw_tfirstbuildrotationz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setFirstBuilding();" />
			<input type="button" id="wtw_bfirstbuildingzr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationz', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingzr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationz', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingzr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationz', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingzr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationz', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Rotate X (front,-back Axis)<br />
			<input type="text" id="wtw_tfirstbuildrotationx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setFirstBuilding();" />
			<input type="button" id="wtw_bfirstbuildingxr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationx', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingxr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationx', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingxr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationx', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingxr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationx', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Rotate Y (up,-down Axis)<br />
			<input type="text" id="wtw_tfirstbuildrotationy" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setFirstBuilding();" />
			<input type="button" id="wtw_bfirstbuildingyr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationy', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingyr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationy', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingyr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationy', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_bfirstbuildingyr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tfirstbuildrotationy', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
	</div>

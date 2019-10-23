	<div id="wtw_adminmenu5b" style="display:none;visibility:hidden;">
		<h2>3D Building Name</h2>
		<input type="text" id="wtw_tbuildingname" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
		<h2>Google Analytics ID</h2>
		<input type="text" id="wtw_tbuildinganalyticsid" maxlength="255" onclick="WTW.checkKey(this, 'webname', 1, 0);" onkeyup="WTW.checkKey(this, 'webname', 1, 0);" onblur="WTW.checkKey(this, 'webname', 1, 1);" /><br />
		<hr class="wtw-menuhr" />
		<div id="wtw_buildingadvancedoptslink" onclick="WTW.toggleAdvanced(this, 'wtw_buildingadvancedopts');" class="wtw-showhideadvanced">-- Show Advanced Options --</div>
		<div id="wtw_buildingadvancedopts" style="display:none;visibility:hidden;">
			<br />
			<h2 style="margin-bottom:3px;">Alt Tag for 3D Building</h2>
			<input type="text" id="wtw_tbuildingalttag" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
			<br />
			<hr class="wtw-menuhr" />
			<div class="wtw-hide">
				<h2>Link to My<br />WooCommerce Store</h2>
<!--			<div class="wtw-menulevel0">Open Store in iframe <input type="checkbox" id="wtw_tstoreiframes" value="0"  /></div> -->
				<div class="wtw-menulevel0 wtw-hide">Store Plugin Name<br />
					<input type="text" id="wtw_twpplugin" maxlength="255" onclick="WTW.checkKey(this, 'web', 0, 0);" onkeyup="WTW.checkKey(this, 'web', 0, 0);" onblur="WTW.checkKey(this, 'web', 0, 1);" /><br />
					<div class="wtw-sampletext wtw-inlineindent">Example:<br />woocommerce-3d-store</div>
				</div>
<!--			<div class="wtw-menulevel0">Store Base URL<br />
					<input type="text" id="wtw_tstoreurl" class="wtw-inlineindent" maxlength="255" onclick="WTW.checkKey(this, 'web', 0, 0);" onkeyup="WTW.checkKey(this, 'web', 0, 0);" onblur="WTW.checkKey(this, 'web', 0, 1);" /><br />
					<div class="wtw-sampletext wtw-inlineindent">Example: https://www.walktheweb.com</div>
				</div>
				<div class="wtw-menulevel0">Shopping Cart URL<br />
					<input type="text" id="wtw_tstorecarturl" class="wtw-inlineindent" maxlength="255" onclick="WTW.checkKey(this, 'web', 0, 0);" onkeyup="WTW.checkKey(this, 'web', 0, 0);" onblur="WTW.checkKey(this, 'web', 0, 1);" /><br />
					<div class="wtw-sampletext wtw-inlineindent">Example: https://www.walktheweb.com/cart/</div>
				</div>
				<div class="wtw-menulevel0">Product Base URL<br />
					<input type="text" id="wtw_tstoreproducturl" class="wtw-inlineindent" maxlength="255" onclick="WTW.checkKey(this, 'web', 0, 0);" onkeyup="WTW.checkKey(this, 'web', 0, 0);" onblur="WTW.checkKey(this, 'web', 0, 1);" /><br />
					<div class="wtw-sampletext wtw-inlineindent">Example: https://www.walktheweb.com/product/</div>
				</div>
-->				<div class="wtw-menulevel0">WooCommerce API Base URL<br />
					<input type="text" id="wtw_tstorewoocommerceapiurl" class="wtw-inlineindent" maxlength="255" onclick="WTW.checkKey(this, 'web', 0, 0);" onkeyup="WTW.checkKey(this, 'web', 0, 0);" onblur="WTW.checkKey(this, 'web', 0, 1);" /><br />
					<div class="wtw-sampletext wtw-inlineindent">Example: https://www.walktheweb.com/wp-json/wc/v2/</div>
				</div>
				<div class="wtw-menulevel0">WooCommerce API Key<br />
					<input type="text" id="wtw_tstorewoocommercekey" class="wtw-inlineindent" maxlength="255" onclick="WTW.checkKey(this, 'web', 0, 0);" onkeyup="WTW.checkKey(this, 'web', 0, 0);" onblur="WTW.checkKey(this, 'web', 0, 1);" /><br />
					<div class="wtw-sampletext wtw-inlineindent">Example: ck_blah1blah2blah3blah4blah5blah6</div>
				</div>
				<div class="wtw-menulevel0">WooCommerce API Secret<br />
					<input type="text" id="wtw_tstorewoocommercesecret" class="wtw-inlineindent" maxlength="255" onclick="WTW.checkKey(this, 'web', 0, 0);" onkeyup="WTW.checkKey(this, 'web', 0, 0);" onblur="WTW.checkKey(this, 'web', 0, 1);" /><br />
					<div class="wtw-sampletext wtw-inlineindent">Example: cs_blah1blah2blah3blah4blah5blah6</div>
				</div>	
			</div>			
		</div>
		<br />
		<div id="wtw_adminmenubuildsave" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Save Settings</div>
	</div>

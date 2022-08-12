<?php
require_once('../functions/class_wtwhandlers.php');
require_once('../functions/class_wtwinvoices.php');
global $wtwhandlers;
global $wtwinvoices;
try {

	/* get values from querystring or session */
	$zinvoiceid = $wtwhandlers->getVal('invoiceid','');
	$zinvoicedate = '';
	$zdomainname = '';
	$zinvoicedescription = '';
	$zinvoicetotal = '';
	
	/* get invoice */
	$zresponse = $wtwinvoices->getInvoice($zinvoiceid);
	$zresponse = json_decode($zresponse);

	/* check data and format */
	if (isset($zresponse->invoice[0])) {
		$zinvoiceid = $zresponse->invoice[0]->invoiceid;
	} else {
		$zinvoiceid = '';
	}
	
	
	if (!isset($zinvoiceid) || empty($zinvoiceid)) {
		$zinvoiceid = "NOT FOUND";
	} else {
		if (isset($zresponse->invoice[0]->invoicedate)) {
			$zinvoicedate = $zresponse->invoice[0]->invoicedate;
		}
		if (isset($zresponse->invoice[0]->domainname)) {
			$zdomainname = $zresponse->invoice[0]->domainname;
		}
		if (isset($zresponse->invoice[0]->invoicedescription)) {
			$zinvoicedescription = $zresponse->invoice[0]->invoicedescription;
		}
		if (isset($zresponse->invoice[0]->invoicetotal)) {
			$zinvoicetotal = $zresponse->invoice[0]->invoicetotal;
		}
		$zinvoicedate = $wtwhandlers->formatDate($zinvoicedate);
	}
} catch (Exception $e) {
	$wtwhandlers->serror("pages-invoice.php=".$e->getMessage());
}
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php echo $wtwhandlers->domainname; ?> - Invoice ID <?php echo $zinvoiceid; ?></title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<link rel="stylesheet" type="text/css" href="/core/styles/wtw_core.css" />
	<script>
		function WTWJS() {}
		var WTW = new WTWJS();
		var wtw_devmode = 1;
	</script>
	<script src="/core/scripts/prime/wtw_utilities.js"></script>
</head>
<body style="background-color:#4d4d4d;">
<div id="wtw_div" style="text-align:center;">
	<div style="max-width:1000px;margin-left:auto;margin-right:auto;margin-top:20px;padding:20px;background-color:#ffffff;border:1px solid gray;color:#000000;">
		<form id="form1" method="POST" action="invoice.php?invoiceid=<?php echo $zinvoiceid; ?>">
			<img src="/content/system/images/HTTP3DLogo-sticker.jpg" style="width:120px;height:auto;float:left;margin:10px;" />
			<div style="text-align:left;margin-left:20px;"><br />
				<b>HTTP3D Inc. - WalkTheWeb</b><br />
				PO Box 6547<br />
				San Diego, CA 92166<br />
				(WAL)KTH-EWEB - (925)584-3932<br /><br />
				<div style="float:right;margin-right:10px;">Invoice Date: <b><?php echo $zinvoicedate; ?></b></div>
				Invoice ID: <b><?php echo $zinvoiceid; ?></b><br />
			</div>
			<div style="clear:both;"></div><hr />
			<div style="text-align:left;">
				&nbsp;&nbsp;&nbsp;Invoice Description: <b><?php echo $zinvoicedescription; ?></b><br /><br />
				&nbsp;&nbsp;&nbsp;Domain Name: <b><?php echo $zdomainname; ?></b>
				<div style="clear:both;"></div><hr /><br /><br /><br />
<?php	if (count($zresponse->invoicedetails)>0) { ?>
				<table class="wtw-table" style="width:90%;margin-left:5%;margin-right:auto;">
					<tr>
						<td class="wtw-tablecolumnheading" ><b>Quantity</b></td>
						<td class="wtw-tablecolumnheading"><b>Description</b></td>
						<td class="wtw-tablecolumnheadingright"><b>Each</b></td>
						<td class="wtw-tablecolumnheadingright"><b>Total</b></td>
					</tr>
<?php		foreach ($zresponse->invoicedetails as $zrow) { ?>
					<tr>
						<td class="wtw-tablecolumns"><?php echo $zrow->quantity; ?></td>
						<td class="wtw-tablecolumns"><?php echo $zrow->description; ?></td>
						<td class="wtw-tablecolumnsright"><?php echo $wtwhandlers->formatMoney($zrow->price); ?></td>
						<td class="wtw-tablecolumnsright"><?php echo $wtwhandlers->formatMoney($zrow->quantity * $zrow->price); ?></td>
					</tr>
<?php		} ?>
					<tr>
						<td class="wtw-tablecolumns">&nbsp;</td>
						<td class="wtw-tablecolumns">&nbsp;</td>
						<td class="wtw-tablecolumnsright"><b>Invoice Total:</b></td>
						<td class="wtw-tablecolumnsright"><b><?php echo $wtwhandlers->formatMoney($zinvoicetotal); ?></b></td>
					</tr>
				</table>
				<div style="clear:both;"></div>
<?php	} ?>
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			</div><hr />
			<div class="wtw-servicelisting-invoice">
				<div style="clear:both;"></div>
				<div class="wtw-notice">
					Notice: WalkTheWeb 3D Internet is an experimental new technology. WalkTheWeb relies on numerous technologies including some that are still evolving. While we strive for perfection, some things are out of our control and may result in times when services are unavailable. We will adapt to changes as quickly as possible to provide the best service possible. Know that these services are the same services that make our own 3D Websites work. Your success is our success!
				</div>
			</div>
			<div style="clear:both;"></div>
			<input type="submit" id="wtw_submit" value="submit" style="visibility:hidden;display:none;" />
		</form>
	</div>
	<div style="clear:both;"></div>
</div>
</body>
</html>
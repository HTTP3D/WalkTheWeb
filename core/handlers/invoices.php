<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for invoice functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwinvoices.php');
	global $wtwinvoices;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	if (!defined('wtw_defaultlanguage')) {
		define('wtw_defaultlanguage','English');
	}
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zinvoiceid = $wtwhandlers->getPost('invoiceid','');
	$zdomainname = $wtwhandlers->getPost('domainname','');
	$zemail = $wtwhandlers->getPost('email','');
	$zinvoicedate = $wtwhandlers->getPost('invoicedate','');
	$zinvoicedescription = $wtwhandlers->getPost('invoicedescription','');
	$zinvoicetotal = $wtwhandlers->getPost('invoicetotal','');
	$zinvoicedetailid = $wtwhandlers->getPost('invoicedetailid','');
	$zsortorder = $wtwhandlers->getPost('sortorder','');
	$zquantity = $wtwhandlers->getPost('quantity','');
	$zdescription = $wtwhandlers->getPost('description','');
	$zprice = $wtwhandlers->getPost('price','');
	$zlist = $wtwhandlers->getPost('list','my');

	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "getinvoice":
			/* get invoice */
			$zresponse = $wtwinvoices->getInvoice($zinvoiceid);
			break;
		case "getinvoices":
			/* get the recordset of invoices */
			$zresponse = $wtwinvoices->getInvoices($zlist);
			break;
		case "saveinvoice":
			/* save an invoice */
			$zresponse = $wtwinvoices->saveInvoice($zinvoiceid, $zdomainname, $zemail, $zinvoicedate, $zinvoicedescription, $zinvoicetotal);
			break;
		case "deleteinvoice":
			/* delete an invoice */
			$zresponse = $wtwinvoices->deleteInvoice($zinvoiceid);
			break;
		case "saveinvoicedetail":
			/* save an invoice detail */
			$zresponse = $wtwinvoices->saveInvoiceDetail($zinvoicedetailid, $zinvoiceid, $zsortorder, $zquantity, $zdescription, $zprice);
			break;
		case "deleteinvoicedetail":
			/* delete an invoice detail */
			$zresponse = $wtwinvoices->deleteInvoiceDetail($zinvoicedetailid);
			break;	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-invoices.php=".$e->getMessage());
}
?>
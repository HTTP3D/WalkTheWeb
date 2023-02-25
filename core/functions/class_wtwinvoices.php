<?php
class wtwinvoices {
	/* wtwinvoices class for admin database functions for tools */
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

	public function getInvoice($zinvoiceid) {
		global $wtwhandlers;
		$zresponse = array(
			'invoice'=> null,
			'invoicedetails'=> null,
			'transactions'=> null,
			'serror'=> ''
		);
		try {
			if ($wtwhandlers->hasValue($zinvoiceid)) {
				$zinvoice = array();
				$zinvoicedetails = array();
				$ztransactions = array();
				if ($wtwhandlers->isUserInRole("Admin")) {
					$zinvoice = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."invoices
						where invoiceid='".$zinvoiceid."'
							and deleted=0;");
					$zinvoicedetails = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."invoicedetails
						where invoiceid='".$zinvoiceid."'
							and deleted=0
						order by sortorder, invoicedetailid;");
					$ztransactions = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."transactions
						where invoiceid='".$zinvoiceid."'
							and deleted=0
						order by createdate, transactionid;");
				} else {
					$zinvoice = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."invoices
						where deleted=0
							and invoiceid='".$zinvoiceid."'
							and (hostuserid='".$wtwhandlers->userid."'
								or createuserid='".$wtwhandlers->userid."');");
					$zinvoicedetails = $wtwhandlers->query("
						select id1.* 
						from ".wtw_tableprefix."invoicedetails id1
							inner join ".wtw_tableprefix."invoices i1
							on i1.invoiceid = id1.invoiceid
						where id1.invoiceid='".$zinvoiceid."'
							and id1.deleted=0
							and (i1.hostuserid='".$wtwhandlers->userid."'
								or id1.createuserid='".$wtwhandlers->userid."')
						order by id1.sortorder, id1.invoicedetailid;");
				}
				$zresponse = array(
					'invoice'=> $zinvoice,
					'invoicedetails'=> $zinvoicedetails,
					'transactions'=> $ztransactions
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwinvoices.php-getInvoice=".$e->getMessage());
			$zresponse = array(
				'invoice'=> null,
				'invoicedetails'=> null,
				'transactions'=> null,
				'serror'=> $e->getMessage()
			);
		}
		return json_encode($zresponse);
	}

	public function getInvoices($zlist) {
		global $wtwhandlers;
		$zresponse = array(
			'invoices'=> null,
			'serror'=> ''
		);
		try {
			if (!isset($zlist) || empty($zlist)) {
				$zlist = '';
			}
			$i = 0;
			$zresults = array();
			if ($zlist == 'my') {
				if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Developer") || $wtwhandlers->isUserInRole("Host")) {
					$zresults = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."invoices
						where deleted=0
							and (hostuserid='".$wtwhandlers->userid."'
								or createuserid='".$wtwhandlers->userid."')
						order by invoicedate desc, invoiceid desc;");
				}
			} else {
				if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Developer")) {
					$zresults = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."invoices
						where deleted=0
						order by invoicedate desc, invoiceid desc;");
				} else if ($wtwhandlers->isUserInRole("Host")) {
					$zresults = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."invoices
						where deleted=0
							and (hostuserid='".$wtwhandlers->userid."'
								or createuserid='".$wtwhandlers->userid."')
						order by invoicedate desc, invoiceid desc;");
				}
			}
			foreach ($zresults as $zrow) {
				$zinvoiceid = $zrow["invoiceid"];
				$zinvoicedetails = array();
				$ztransactions = array();
				if ($wtwhandlers->isUserInRole("Admin")) {
					$zinvoicedetails = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."invoicedetails
						where invoiceid='".$zinvoiceid."'
							and deleted=0
						order by sortorder, invoicedetailid;");
					$ztransactions = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."transactions
						where invoiceid='".$zinvoiceid."'
							and deleted=0
						order by createdate, transactionid;");
				} else {
					$zinvoicedetails = $wtwhandlers->query("
						select id1.* 
						from ".wtw_tableprefix."invoicedetails id1
							inner join ".wtw_tableprefix."invoices i1
							on i1.invoiceid = id1.invoiceid
						where id1.invoiceid='".$zinvoiceid."'
							and id1.deleted=0
							and (i1.hostuserid='".$wtwhandlers->userid."'
								or id1.createuserid='".$wtwhandlers->userid."')
						order by id1.sortorder, id1.invoicedetailid;");
				}
				$zresponse["invoices"][$i] = array(
					'invoiceid'=> $zrow["invoiceid"],
					'hostuserid'=> $zrow["hostuserid"],
					'domainname'=> $zrow["domainname"],
					'email'=> $zrow["email"],
					'invoicedate'=> $zrow["invoicedate"],
					'invoicedescription'=> $zrow["invoicedescription"],
					'invoicetotal'=> $zrow["invoicetotal"],
					'createdate'=> $zrow["createdate"],
					'updatedate'=> $zrow["updatedate"],
					'invoicedetails'=> $zinvoicedetails,
					'transactions'=> $ztransactions
				);
				$i += 1;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwinvoices.php-getInvoices=".$e->getMessage());
			$zresponse = array(
				'invoices'=> null,
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function saveInvoice($zinvoiceid, $zdomainname, $zemail, $zinvoicedate, $zinvoicedescription, $zinvoicetotal) {
		global $wtwhandlers;
		$zresponse = array(
			'invoiceid'=> '',
			'serror'=> ''
		);
		try {
			if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Developer") || $wtwhandlers->isUserInRole("Host")) {
				$zfoundinvoiceid = '';
				if (!isset($zinvoicedate) || empty($zinvoicedate)) {
					$zinvoicedate = "now()";
				} else {
					$zinvoicedate = $wtwhandlers->prepCheckDate($zinvoicedate);
				}
				if ($wtwhandlers->hasValue($zinvoiceid)) {
					$zresults = $wtwhandlers->query("
						select invoiceid 
						from ".wtw_tableprefix."invoices
						where invoiceid='".$zinvoiceid."';");
					foreach ($zresults as $zrow) {
						$zfoundinvoiceid = $zrow["invoiceid"];
					}
				}
				if (!isset($zfoundinvoiceid) || empty($zfoundinvoiceid)) {
					/* insert invoice */
					if (!isset($zinvoiceid) || empty($zinvoiceid)) {
						$zinvoiceid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."invoices
						   (invoiceid,
						    hostuserid,
						    domainname,
							userid,
							userip,
							email,
							invoicedate,
							invoicedescription,
							invoicetotal,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zinvoiceid."',
						    '".$wtwhandlers->userid."',
						    '".$zdomainname."',
							'".$wtwhandlers->userid."',
							'".$wtwhandlers->userip."',
							'".$zemail."',
							".$zinvoicedate.",
							'".$zinvoicedescription."',
							".$wtwhandlers->checkNumber($zinvoicetotal,0).",
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."')
					");
				} else {
					/* update invoice */
					$wtwhandlers->query("
						update ".wtw_tableprefix."invoices
						set domainname='".$zdomainname."',
							invoicedate=".$zinvoicedate.",
							invoicedescription='".$zinvoicedescription."',
							invoicetotal=".$wtwhandlers->checkNumber($zinvoicetotal,0).",
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."',
							deleteddate=null,
							deleteduserid='',
							deleted=0
						where invoiceid='".$zinvoiceid."';");
				}
				$zresponse = array(
					'invoiceid'=> $zinvoiceid,
					'serror'=> ''
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwinvoices.php-saveInvoice=".$e->getMessage());
			$zresponse = array(
				'invoiceid'=> $zinvoiceid,
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function deleteInvoice($zinvoiceid) {
		global $wtwhandlers;
		$zresponse = array(
			'invoiceid'=> '',
			'serror'=> ''
		);
		try {
			if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Developer")) {
				$zfoundinvoiceid = '';
				if ($wtwhandlers->hasValue($zinvoiceid)) {
					$zresults = $wtwhandlers->query("
						select invoiceid 
						from ".wtw_tableprefix."invoices
						where invoiceid='".$zinvoiceid."';");
					foreach ($zresults as $zrow) {
						$zfoundinvoiceid = $zrow["invoiceid"];
					}
				}
				if ($wtwhandlers->hasValue($zfoundinvoiceid)) {
					/* mark delete invoice */
					$wtwhandlers->query("
						update ".wtw_tableprefix."invoices
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where invoiceid='".$zinvoiceid."';");
					$wtwhandlers->query("
						update ".wtw_tableprefix."invoicedetsails
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where invoiceid='".$zinvoiceid."';");
				}
				$zresponse = array(
					'invoiceid'=> $zinvoiceid,
					'serror'=> ''
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwinvoices.php-deleteInvoice=".$e->getMessage());
			$zresponse = array(
				'invoiceid'=> $zinvoiceid,
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function saveInvoiceDetail($zinvoicedetailid, $zinvoiceid, $zsortorder, $zquantity, $zdescription, $zprice) {
		global $wtwhandlers;
		$zresponse = array(
			'invoiceid'=> '',
			'invoicedetailid'=> '',
			'serror'=> ''
		);
		try {
			if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Developer") || $wtwhandlers->isUserInRole("Host")) {
				$zfoundinvoicedetailid = '';
				if ($wtwhandlers->hasValue($zinvoicedetailid)) {
					$zresults = $wtwhandlers->query("
						select invoicedetailid 
						from ".wtw_tableprefix."invoicedetails
						where invoicedetailid='".$zinvoicedetailid."';");
					foreach ($zresults as $zrow) {
						$zfoundinvoicedetailid = $zrow["invoicedetailid"];
					}
				}
				if (!isset($zfoundinvoicedetailid) || empty($zfoundinvoicedetailid)) {
					/* insert invoice detail */
					if (!isset($zinvoicedetailid) || empty($zinvoicedetailid)) {
						$zinvoicedetailid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."invoicedetails
						   (invoicedetailid,
						    invoiceid,
							sortorder,
							quantity,
							description,
							price,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zinvoicedetailid."',
						    '".$zinvoiceid."',
							".$wtwhandlers->checkNumber($zsortorder,0).",
							".$wtwhandlers->checkNumber($zquantity,1).",
							'".$zdescription."',
							".$wtwhandlers->checkNumber($zprice,0).",
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."')
					");
				} else {
					/* update invoice detail */
					$wtwhandlers->query("
						update ".wtw_tableprefix."invoicedetails
						set sortorder=".$wtwhandlers->checkNumber($zsortorder,0).",
							quantity=".$wtwhandlers->checkNumber($zquantity,1).",
							description='".$zdescription."',
							price=".$wtwhandlers->checkNumber($zprice,0).",
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."',
							deleteddate=null,
							deleteduserid='',
							deleted=0
						where invoicedetailid='".$zinvoicedetailid."'
							and invoiceid='".$zinvoiceid."';");
				}
				$zresponse = array(
					'invoiceid'=> $zinvoiceid,
					'invoicedetailid'=> $zinvoicedetailid,
					'serror'=> ''
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwinvoices.php-saveInvoiceDetail=".$e->getMessage());
			$zresponse = array(
				'invoiceid'=> $zinvoiceid,
				'invoicedetailid'=> $zinvoicedetailid,
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;		
	}

	public function deleteInvoiceDetail($zinvoicedetailid) {
		global $wtwhandlers;
		$zresponse = array(
			'invoiceid'=> '',
			'invoicedetailid'=> '',
			'serror'=> ''
		);
		try {
			if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Developer")) {
				$zfoundinvoicedetailid = '';
				if ($wtwhandlers->hasValue($zinvoicedetailid)) {
					$zresults = $wtwhandlers->query("
						select invoicedetailid 
						from ".wtw_tableprefix."invoicedetails
						where invoicedetailid='".$zinvoicedetailid."';");
					foreach ($zresults as $zrow) {
						$zfoundinvoicedetailid = $zrow["invoicedetailid"];
					}
				}
				if ($wtwhandlers->hasValue($zfoundinvoicedetailid)) {
					/* mark delete invoice detail */
					$wtwhandlers->query("
						update ".wtw_tableprefix."invoicedetails
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where invoicedetailid='".$zinvoicedetailid."'
							and invoiceid='".$zinvoiceid."';");
				}
				$zresponse = array(
					'invoiceid'=> $zinvoiceid,
					'invoicedetailid'=> $zinvoicedetailid,
					'serror'=> ''
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwinvoices.php-deleteInvoiceDetail=".$e->getMessage());
			$zresponse = array(
				'invoiceid'=> $zinvoiceid,
				'invoicedetailid'=> $zinvoicedetailid,
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;		
	}
	
	public function getOptionalUpdates() {
		/* returns list of optional updates if they exist */
		global $wtwhandlers;
		$zresponse = array(
			'upgrades'=> array(),
			'serror'=> ''
		);
		try {
			$zhostuserid = '';
			if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false && $wtwhandlers->isUserInRole("Developer") == false) {
				$zhostuserid = $wtwhandlers->userid;
			}
			if ($wtwhandlers->hasValue($zhostuserid)) {
				$zresults = $wtwhandlers->query("
					select oaa1.*,
						oa1.title,
						oa1.instructions,
						oa1.description,
						oa1.serverwide,
						oa1.hostwide,
						oa1.domainwide,
						oa1.subscription,
						oa1.startprice
					from ".wtw_tableprefix."optionalupgradesapplied oaa1
						inner join ".wtw_tableprefix."optionalupgrades oa1
						on oaa1.optionalid=oa1.optionalid
					where oaa1.deleted=0
						and (oaa1.hostuserid='".$wtwhandlers->userid."'
							or oaa1.createuserid='".$wtwhandlers->userid."')
					order by oaa1.activedate desc, oaa1.domainname, oaa1.optionalid, oaa1.appliedid;");
				$zresponse = array(
					'upgrades'=> $zresults,
					'serror'=> ''
				);
			} else if ($wtwhandlers->isUserInRole("Admin") || $wtwhandlers->isUserInRole("Developer")) {
				$zresults = $wtwhandlers->query("
					select oaa1.*,
						oa1.title,
						oa1.instructions,
						oa1.description,
						oa1.serverwide,
						oa1.hostwide,
						oa1.domainwide,
						oa1.subscription,
						oa1.startprice
					from ".wtw_tableprefix."optionalupgradesapplied oaa1
						inner join ".wtw_tableprefix."optionalupgrades oa1
						on oaa1.optionalid=oa1.optionalid
					where oaa1.deleted=0
						and oaa1.hostuserid=''
					order by oaa1.activedate desc, oaa1.domainname, oaa1.optionalid, oaa1.appliedid;");
				$zresponse = array(
					'upgrades'=> $zresults,
					'serror'=> ''
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwinvoices.php-getOptionalUpdates=".$e->getMessage());
			$zresponse = array(
				'upgrades'=> array(),
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;		
	}
}

	function wtwinvoices() {
		return wtwinvoices::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwinvoices'] = wtwinvoices();
?>
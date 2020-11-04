<?php
	 define("wtw_serverinstanceid", "uniqueAlphaNumber"); /* unique alpha numeric value 16 digits - automatically added by app if not found */
     define("wtw_dbserver", "serverIP:Port");
     define("wtw_dbname", "dbname");
     define("wtw_dbusername", "dbuser");
     define("wtw_dbpassword", "dbpassword");
     define("wtw_tableprefix", "wtw_");

     define("wtw_devmode", "1");

     define("wtw_contentpath", "\\\\localhost\\mywebsite\\content");
     define("wtw_contenturl", "/content");

     define("wtw_defaultdomain", "3d.domainname.com");

     define("wtw_defaultsitename", "Friendly Name");
     define("wtw_googleanalytics", "UA-########-#");
     define("wtw_adminemail", "email@address.com");
	 


	 /* Optional Values you can add */
	 
	 define("wtw_adminname", "Admin Name");
	 
	 define("wtw_umask", "0027");
	 define("wtw_chmod", "755");
	 
	 /* ftp settings - for file transfers */
	 define("wtw_ftpuser", "ftpLoginName");
	 define("wtw_ftppassword", "base64_password"); 	 /* you can set the password in the Admin - Settings menu */
	 define("wtw_ftpbase", "/subfolder/"); /* folder path under FTP root - for WalkTheWeb website root folder */
?>
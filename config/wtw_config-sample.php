<?php
     define("wtw_dbserver", "serverIP:Port");
     define("wtw_dbname", "dbname");
     define("wtw_dbusername", "dbuser");
     define("wtw_dbpassword", "dbpassword");
     define("wtw_tableprefix", "wtw_");

     define("wtw_devmode", "1");

     define("wtw_contentpath", "\\\\localhost\\mywebsite\\content");
     define("wtw_contenturl", "/content");

     define("wtw_defaultdomain", "3d.domainname.com");

	 # When someone browses your site by just the domain name...
	 # wtw_defaultcommunity, wtw_defaultbuilding, and wtw_defaultthing are used to set the home page for your site.
	 # Each path segment also determines which starting point the avatars will use.
	 #
	 # Examples:
	 #
	 #   define("wtw_defaultcommunity", "mycommunity"); 
	 #     works like:     https://3d.yourdomain.com/mycommunity
	 #     or              https://3d.yourdomain.com/communities/mycommunity
	 #     sets the starting point as the community starting point
	 #
	 #   define("wtw_defaultbuilding", "mybuilding"); 
	 #     works like:     https://3d.yourdomain.com/buildings/mybuilding   (loads only the building)
	 #     sets the starting point as the building starting point without a community
	 # 
	 #   define("wtw_defaultthing", "mything"); 
	 #     works like:     https://3d.yourdomain.com/things/mything   (loads only the thing)
	 #     sets the starting point as the thing starting point without a community or building
	 # 
	 #   if wtw_defaultcommunity and wtw_defaultbuilding are set:
	 #     works like:     https://3d.yourdomain.com/mycommunity/mybuilding
	 #     sets the starting point as the building starting point in the community
	 #
	 #   if wtw_defaultcommunity, wtw_defaultbuilding, and wtw_defaultthing are set:
	 #     works like:     https://3d.yourdomain.com/mycommunity/mybuilding/mything
	 #     sets the starting point as the thing starting point in the building in the community
	 	 
	 #define("wtw_defaultcommunity", "mycommunity");
	 #define("wtw_defaultbuilding", "mybuilding");
	 #define("wtw_defaultthing", "mything");

     define("wtw_defaultsitename", "Friendly Name");
     define("wtw_googleanalytics", "UA-########-#");
     define("wtw_defaultfromemail", "email@address.com");
?>
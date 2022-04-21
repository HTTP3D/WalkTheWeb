# WalkTheWeb
Open-Source 3D Internet Metaverse - Multiverse - 3D CMS (Content Management System) to Build Games and 3D Shopping Websites
Invented and created by Aaron Dishno Ed.D.
CEO and Founder of HTTP3D Inc. - WalkTheWeb
Find me at http://WalkTheWeb.tv  (WalkTheWeb on Twitch) or ask me questions on Discord: https://discord.com/invite/MW7MG2t

Create your own Metaverse - multiverse with our easy to use WalkTheWeb 3D Internet Hosting software. While you do not have to be a programer to use it, programmers can easily take advantage of the Babylonjs.com Game Engine and build 3D Games and 3D Content using our 3D CMS software and your own code together. Multiplayer functionality and services are readily available from WalkTheWeb (keeps the work load off your server). Babylonjs.com supports browser based devices that can use WebGL and 3D Scenes can be viewed by numerous camera views for Computers, Cell Phones, Tablets, and Virtual Reality equipment (VR). WalkTheWeb uses PHP, JavaScript, and MySQL it can be hosted on any server capable of running WordPress.

3D CMS is a 3D Content Management System for easily creating and hosting you own 3D Games, 3D Shopping and 3D Metaverse and Multiverse Scenes. Using the Babylonjs.com game engine and works completely in the browser (does not download an app). You can put each of your 3D Buildings into many 3D Community Scenes. Makes it easy to update in one place, yet a powerful distribution by allowing your 3D Building (or 3D Game) to be visited in many 3D Scenes! Think of it as combining WordPress with a 3D Game Engine!

Optional enhancement: Connect your 3D Store (WordPress and WooCommerce) using the WalkTheWeb WordPress Plugin: https://wordpress.org/plugins/walktheweb/
New Version coming soon that supports WalkTheWeb Open-Source Self Hosting! (https://github.com/HTTP3D/WalkTheWeb-WordPress-Plugin)

INSTALLATION
---------------------------------------------------------------------------
1.  To Install, copy the files into the root of a website.
2.  It is highly recommended to start your URL with http://3d.  or   https://3d. to 
    signify it is a WalkTheWeb 3D Website and help others find your Metaverse!
3.  The browser user (inetuser) will need write access in the entire folder for updates.
4.  Optional: you can manually download updates and overwrite the program files, 
    but the /content folder must have write permissions for Admin user uploads.
5.  Set up your database and database user in MySQL or MariaDB.
6.  Open the website to configure and launch.
7.  Optional: You can manually configure the settings as /config/wtw_config.php
    (sample config file is provided in the /config folder)
    Open the website to complete the installation.
8.  After installation completes, feel free to checkout the additional WalkTheWeb downloads in the Admin Menu - Media Library.

That is it! 

Check out this video of the Install and Getting Started Walk-Through:
https://www.youtube.com/watch?v=EMrBnzfAMZM


Note: on Linux systems, add a .htaccess file in the root (or use site config) with the following:

RewriteEngine On

RewriteBase /

RewriteCond %{REQUEST_FILENAME} !-f

RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule ^.*$ /index.php?wtwpath=%{REQUEST_URI}&%{QUERY_STRING} [P]




LEARNING
---------------------------------------------------------------------------
There are videos at: https://www.youtube.com/c/WalkTheWeb3d
or watch me on http://walktheweb.tv     (WalkTheWeb on Twitch)

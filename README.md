# WalkTheWeb
Open-Source 3D Internet (3D CMS)
Invented and created by Aaron Dishno Ed.D.
CEO and Founder of HTTP3D Inc. - WalkTheWeb
Find me at http://WalkTheWeb.tv  (WalkTheWeb on Twitch) or ask me questions on Discord: https://discord.com/invite/MW7MG2t

INSTALLATION
---------------------------------------------------------------------------
1.  To Install, copy the files into the root of a website.
2.  It is highly recommended to start your URL with http://3d.  or   https://3d. to 
    signify it is a WalkTheWeb 3D Website and help others find you!
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
There are videos at: https://www.youtube.com/channel/UCEcaZ947Mv1ylLd_MYS1ivg
or watch me on http://walktheweb.tv     (WalkTheWeb on Twitch)

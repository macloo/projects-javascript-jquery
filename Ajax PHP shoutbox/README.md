#Notes on Project 5: Ajax PHP shoutbox

In this project, I created a new MySQL database on a server, wrote a connection script, submitted a new row to the database via an HTML form, and also wrote to the live page (via jQuery) at the same time. When the page is reloaded, the full contents of the database are written to the page. Whenever the form is submitted, a new row is written to the db.

Downloaded [XAMPP](https://www.apachefriends.org/index.html)

Installed XAMPP - MySQL and PHP and server in one handy DMG. Nice.

Go to Applications, open XAMPP folder.
HTDOCS - "This is basically your Web server," says the instructor.

His HTDOCS has a million things in it; mine has very few.

1. In HTDOCS, I made a new folder named **js_shoutbox** for this project.

2. Create these new files in that folder: 

    - index.php
    - database.php (to connect to MySQL database)
    - shoutbox.php (to take the POST request and write to the db)

3. Create the usual folders for CSS and JS

4. In browser, open <http://localhost/phpmyadmin/>

5. Databases tab &gt; Create database
    - name it **jsshoutbox**
    - &gt; Create

6. Click database name (jsshoutbox)
    - Create table
    - name it **shouts**
    - Number of columns: 4
    - &gt; Go

7. Create id field - INT - 11 (he says he likes 11, doesn't say why) - and 
   Index: make it the PRIMARY field (scroll to the right, find **Index**) 

8. Check box immediately following Index (**A_I**): this is auto-increment, will add new row after each insertion.

9. Fill other fieldnames: name (VARCHAR), shout (VARCHAR), date (TEXT)

    - Note: For date, he's not using the date options provided, so he selects TEXT as the type. 
   
    None of these have an Index selected. Add char limits for each one.

10. SAVE the table. 

    Leave phpmyadmin, and open index.php at <http://localhost/js_shoutbox/>

***
Write HTML and CSS for index.php (includes a form).

* index.php
* lecture22.css

***

##CONNECT TO DATABASE

database.php

First, return to XAMPP and set a password.

* localhost/xampp
* Security (link on left side)
* /Applications/XAMPP/xamppfiles/xampp security

Well, that didn't work (Mac OS), so I searched and found:

<http://coolestguidesontheplanet.com/add-mysql-password-xampp/>

Open Terminal

Paste:

```
sudo /Applications/XAMPP/xamppfiles/xampp security
```

It walks you through everything with no difficulty.

4 passwords set:

* XAMPP pages
* MySQL/phpMyAdmin user pma
* MySQL root password
* FTP password for user 'daemon'

All good now.


EDIT database.php

$conn is just a normal PHP variable name

<http://php.net/manual/en/language.variables.basics.php>

Now add include to index.php (AT TOP, ABOVE DOCTYPE) 

```
<?php include 'database.php'; ?>
```

You can test page now. Should not throw any errors. 

NOTE: If you force an error (by changing text in database.php), the error message will write at the top of the Web page.

***

##WRITE the jQuery

lecture22.js

1. On submit, get all the values for all the vars.
2. Build the date from JavaScript new Date
3. Build the string to write to the MySQL database. 
4. Use `$.ajax()` to send HTTP POST request

    Write many options.

He adds a function to format the JavaScript date like a MySQL date.  
This seems unnecessary, since we told the database to treat the date field like plaintext, not like a date.  
(But the function might prove useful.)

(At this point, our file shoutbox.php is still empty.)

We fill in some dummy PHP to test it:
`<?php  echo 'hello';  ?>`

Test. Good.

In Chrome, use the console (Network tab) to see results (file list).

***

##WRITING the data

shoutbox.php

Add the same include AT TOP of file: 

```
<?php include 'database.php'; ?>
```

Then all is wrapped in one PHP if-statement, with validation and 
error-checking, put the values passed by AJAX into the SQL database.  
And also write them to the UL in index.php. Which seems kind of 
stupid, since we could have just done that directly.

Ah. He wants the full contents of the db to write into the shoutbox.  
Without the next step, each line writes. But when you reload, all 
lines disappear. 

To view contents of the db: 

* <http://localhost/phpmyadmin/>
* Databases
* jsshoutbox
* Browse (near top)

So, final steps:

* Add more PHP to top of index.php to grab the stuff from the db.
* It's a SQL call to the db, in the PHP.
* Note it will get them in descending order by ID.

Also in index.php, we write some PHP inside the UL to make the database contents write there.

##TRANSFER the project to Web hosting

I had a new hosting company I haven't used for any databases yet, so I wanted to see if I could make this work there. I did, and it wasn't too hard.

1. Create a new MySQL database. My hosting company has a link just for this, separate from the CPanel. Name the db and create a new user to use it. Add that user to the database. This username and password should be different from the username/pw you use to log in at the hosting company's site. 

2. Find out how to get into **phpMyAdmin** on your hosting service. If they have CPanel, it should be like this:

    - Database Tools &gt;
    - phpMyAdmin (click to open it)
    - Log in again with your usual hosting service login and pw

3. Set up the new database -- this is the same as the steps at the beginning of this document. You have to create a table and make your four fieldnames. Make sure all the names are the same as in your original project so your code from the project will work without any changes.

4. **Edit the file database.php.** Remember, this is your connection script, so the PHP has to be changed to match your new db.

     ```
$conn = mysqli_connect("localhost", "db_username", "db_password", "name_of_MySQL_database");
```

    You don't change "localhost," but you do change the rest to match the new database you just made.

5. Transfer your files. You can use any FTP program to do this (I like [FIleZilla](https://filezilla-project.org/)). You should use the exact same folder name as in your project, so you can just grab the whole folder and drag it over. Note that most hosting services will be set up to have your Web pages inside a folder named `public_html` that's already set up by them.

![Illustration: Host FTP 1](http://macloo.github.io/projects-javascript-jquery/Ajax%20PHP%20shoutbox/images/host_upload1.png)

![Illustration: Host FTP 2](http://macloo.github.io/projects-javascript-jquery/Ajax%20PHP%20shoutbox/images/host_upload2.png)

(end)

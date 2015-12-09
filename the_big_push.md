#HOSTING ON THE INTERWEBS

![Push Image](http://cdn.meme.am/instances/57898324.jpg)

We will be pushing our apps to the interwebs. This will allow other humans besides yourself to see and use your application!!!

# STEP 1

Make sure your application is fully functional locally. 

# STEP 2 

Navigate to heroku website. Log in. Create a new application from the dashboard by pressing the plus sign in the top right corner. **DO NOT LEAVE THE PAGE THIS NAVIGATES YOU TO**


#STEP 3

From your terminal. In the root folder of your application. Type `heroku login` enter your credentials. Upon successful login you will get a confirmation that your account has been authenticated. 

#STEP 4

On the page the heroku website left you on after successful app creation you will see a snippet. In this snippet there will be a line to add a remote to your application. Please copy this line and paste it into your terminal in the root folder of your application. The line should look something like this `heroku git:remote -a app_name`

#STEP 5

Heroku needs a `Procfile` in order to know what file to run to start the server. So from the root of your application lets `touch Procfile` this is case sensitive!!! Inside of the `Procfile` add the following code. Provided your server is called `server.js`...... `web: node server.js`


#STEP 6

We need to change how our port is accessed via heroku. 

In your `server.js` change the `app.listen(blah)` to the following. 

```javascript
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log("App running on port : ", app.get('port'));
});

```

#STEP 7

We need to create the db your heroku app will be using. You can no longer use the one running on your local machine. From your terminal in the root of your application run the following command. `heroku addons:create heroku-postgresql:hobby-dev`. 


#STEP 8 

Lets run our schema for our db. Run the following command and change as needed. `heroku pg:psql --app your_app(what you named it on heroku) < schema.sql`. If this was successful you should see what your accustomed to seeing with a successful schema insert. Lets run `heroku pg:psql` to connect to your database and make sure your tables exist. 

#STEP 9

In your `db.js` file please change your connection string to `process.env.DATABASE_URL`

#STEP 10

Lets push up the information we have available now. So run the following command `git push heroku master`

#STEP 11

If you are getting errors, it may be becuase we havent seeded. You may need to insert 1 item into each table as dummy data. **THIS WILL HAVE TO BE A PLAIN SQL FILE** The best way to check heroku errors is to run `heroku logs` from your root folder. This will bring up build log for the application and report any errors it may have come across during the build. 

#STEP 12

Troubleshoot accordingly from here. 

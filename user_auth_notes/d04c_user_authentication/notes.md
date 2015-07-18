Delivery Tips:

* Think about how long you're talking
* Move quicker sooner, slower later
* Cold Call more often
* Revisit LOs
* Defer questions when appropriate

# User Authentication

## Learning Objectives

* Implement user authentication in a Node Express application

## Outline

### The talk

The strategy is going to be as follows. We create users with hashed passwords.
We ask users to log in. We will compare their login info with their saved
password. If they match, we will remember that this user has logged in by
keeping track of their ID. When the log out, we will simply clear this ID.

**You do**

* Set up a `POST /users` route
* Inside this route, `console.log(req.body)`
* Utilize the signup form on the web page, click Sign Up, and view the terminal
  output

**I do - you do**

* Extract and hash password
* Make new user

**You do**

* Set up a `POST /sessions` route
* Inside this route, `console.log(req.body)`
* Utilize the login form on the web page, click Log In, and view the terminal
  output

**I do - you do**

* Find the user
* If user exists
  * Compare the password
  * If password matches
    * Set `session.currentUser`
  * Else
    * Send back 400 - incorrect password
* Else
  * Send back 400 - username not found

**You do**

* Set up a `GET /current_user` route
* Use `req.session.currentUser` to find the current user in the database
  * Remember, `req.session.currentUser` is an ID number
* Send the user object back as a response

**CHECKPOINT - BREAK**

**You do**

* Set up a `DELETE /sessions` route
* Set `req.session.currentUser` to `null`

**CHECKPOINT**

**I do**

* New Post
  * Content from request
  * User from current user
  * 401 if not logged in

# Lesson Plan - Review Notes

Are learning objectives present and complete?
What is the ratio of talking vs. doing? (60/40, TT/ST-wg vs ST-sg / individual)
What is the level of engagement?
Are exercise plans present?
Any pitfalls with the exercises?

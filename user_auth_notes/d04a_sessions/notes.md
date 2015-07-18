Delivery Tips:

* Think about how long you're talking
* Move quicker sooner, slower later
* Cold Call more often
* Revisit LOs
* Defer questions when appropriate

# Sessions

## Learning Objectives

* Explain the stateless nature of HTTP
* Explain how sessions emulate state across HTTP requests
* Utilize `express-session` to persist information across multiple requests
  for a particular client

## Outline

**I do**

### The talk

Draw the diamond

```
sessions   encryption
      \    /
       \  /
        \/
user authentication!
```

* HTTP is a stateless protocol. Nobody remembers stuff about anyone!
* Use the hospital analogy to talk about a "personalized experience", and how an
  ID card will help you do this, along with a file at the hospital
* Link this to a cookie, and a session on the server

**You do**

* Copy over the starter folder
* npm install

**I do - you watch**

* Include `express-session` in
* Set up `GET /session`
* Set up `GET /memory`

**You do**

* Set up `POST /memory`
  * This route should assign the value of `req.body.name` to `session.name`
  * Send a POST request from the browser console with `name` data
  * Visit `/session`

**Checkpoint**

* Set up `DELETE /memory`
  * This should set the value of `session.name` to null

# Lesson Plan - Review Notes

Are learning objectives present and complete?
What is the ratio of talking vs. doing? (60/40, TT/ST-wg vs ST-sg / individual)
What is the level of engagement?
Are exercise plans present?
Any pitfalls with the exercises?

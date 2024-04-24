#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- Alright so far, all our apps were nice and quite, since we only use them in
  local setup, but with this project things are about to get interesting. You
  see, this app will actually host on Heroku, basically deployed on cloud.
  And what that means that we also need to think about security, essentially
  how we can protect our API from some bad actors and the good news is that with
  the help of community, so think npm and more specifically npm packages, we
  really don't need to do that much just install some packages and add them
  as middleware in our app and we are good to go, now is our app going to be
  safe from any possible attack? we'll know, most likely not, remember our biggest
  security hotspot is still our user, Yes of course we should be protecting our
  API. But how are you going to stop the user from storing a token in a unsecure
  manner? There's really no package for that. And as far as the package we're
  going to use well, first we are going to use helmet, arguably the most popular
  security package out there, which sets various headers to prevent numerous
  possible attacks. In fact, how it is so popular, it's actually used in many
  other packages as an dependency.

- After that, we want to implement cors library, which just ensures that our API
  is accessible from different domain. If you don't have cors installed, you'll
  only be able to access the data from the same domain.
  cors stands for cross origin resource sharing and it is a mechanism to allow
  or restrict requested resources on a web server depending on whether the http
  request was initiated, by installing and implementing the cors package essentially
  we make our api accessible to the public.

- xss-clean library which senitizes the user input in the req.body, req.query and
  req.params and as a result protects us from cross site scripting attacks where
  the attacker tries to inject some malicious code.

- express-rate-limiter, we want to limit the amount of requests the user can make
  and we'll do that with the help of express-rate-limit library

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

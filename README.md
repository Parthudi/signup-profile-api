# NodeJS JWT Authentication sample

This is a NodeJS API that supports username and password & user profile authentication with JWTs and has APIs that return Chuck Norris phrases. How awesome is that?

## Available APIs

### User APIs

#### POST `/users`

You can do a POST to `/user/signup` to create a new user.

The body must have:

* `name`: The username
* `age`: The age
* `gender`: The gender
* `email`: The email
* `password`: The password
* `extra`: Some extra information you want to save from the user (It's a string). This could be a color or anything at all.

It returns the following:

```json
{
  "id_token": {jwt},
  "access_token": {jwt}
}
```

The `id_token` and `access_token` are signed with the secret located at the `config.json` file. The `id_token` will contain the `username` and the `extra` information sent, while the `access_token` will contain the `audience`, `jti`, `issuer` and `scope`.

#### POST `/user/login`

You can do a POST to `/user/login` to log a user in.

The body must have:

* `email`: The email
* `password`: The password

It returns the following:

```json
{
  "id_token": {jwt},
  "access_token": {jwt}
}
```

The `id_token` and `access_token` are signed with the secret located at the `config.json` file. The `id_token` will contain the `username` and the `extra` information sent, while the `access_token` will contain the `audience`, `jti`, `issuer` and `scope`.

### Quotes API

#### GET `/user/read`

It returns a String with a specific user . It doesn't require authentication.

#### GET `/user/update`

It returns a String which is used to be updated specific user . It requires authentication. 

#### GET `/user/delete`

It returns a String which is used to delete specific user . It requires authentication.

The JWT - `access_token` must be sent on the `Authorization` header as follows: `Authorization: Bearer {jwt}`

## Running it

Just clone the repository, run `npm install` and then `node server.js`. That's it :).

If you want to run it on another port, just run `PORT=3000 node server.js` to run it on port 3000 for example

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Parthu](https://github.com/Parthudi)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.


## Use Postman

Postman provides a powerful GUI platform to make your API development faster & easier, from building API requests through testing, documentation and sharing

Here is a [small collection](https://documenter.getpostman.com/view/3232248/auth0-nodejs-jwt-auth/7LnAi4o) to highlight the features of this sample API.

[![Run NodeJS JWT Authentication in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c57ddc507592c436662c)

# Store-FWD

#### Environment Variables:

* POSTGRES_HOST =*******
* POSTGRES_DB = 'STORE_FWD'
* POSTGRES_USER = "postgres"
* POSTGRES_PASSWORD = "Pass123$"
* POSTGRES_TEST_DB='testDb'
* NODE_ENV = 'dev'
* PORT = 3000
* BCRYPT_PASSWORD =******
* SALT_ROUNDS = 10
* JWT_STRING=******

you can assign values to which has stars value debends on your environment

#### Database Setub

1-  CREATE DATABASE STORE_FWD;

2- CREATE DATABASE testDb;

- Create user
  1- CREATE USER postgres  WITH PASSWORD 'Pass123$'

  - Grante privileges on both databases
    2- GRANT ALL PRIVILEGES ON DATABASE STORE_FWD TO postgres

    3-GRANT ALL PRIVILEGES ON DATABASE testdb TO postgres;

> After running migrations to create the tables

**you can start the the server by command:**

install npm packages using 

'npm i'

**To run the application you can use script**

' npm run dev ';

the application will run on route' http://localhost:3000 '

## Users Model

then you can do all request on '**http://localhost:3000/users**'

* to get all users use [ **Get** ] verb on above route
* to get user by id use [ **Get** ] verb on  route ' http://localhost:3000/users/userid '
* to create user by [ **POST** ] verb on above route
* to update use [ **PUT** ] verb with mentiond JSON structure below;
* to delete user by [ **DELETE** ] verb ' **http://localhost:3000/users/userid '**

## JWT token of login

You can can call 'http://localhost:3000/users/auth' by [ **POST** ] request with loginName and password

```javascript
{
"loginName":"admin1",
"password":"Pass123$"
}
```

after copying token form response put it in header actions that need authentications as authoriztion key and in value put "bearer Token"

## Orders Model

all request on '**http://localhost:3000/orders**'

* to get all users use [ **Get** ] verb on above route
* to get user by id use [ **Get** ] verb on  route ' **http://localhost:3000/orders/userid** '
* to create user by [ **POST** ] verb on above route
* to update use [ **PUT** ] verb with mentiond JSON structure below;
* to delete user by [ **DELETE** ] verb ' **http://localhost:3000/orders/orderid '**

## Products Model

all request on '**http://localhost:3000/products**'

* to get all users use [ **Get** ] verb on above route
* to get user by id use [ **Get** ] verb on  route ' **http://localhost:3000/products/productid** '
* to create user by [ **POST** ] verb on above route
* to update use [ **PUT** ] verb with mentiond JSON structure below;
* to delete user by [ **DELETE** ] verb ' **http://localhost:3000/products/productid '**

## For any update request in any model

you need to send the updates in form of Array of objects for each updated value for example to update firstName and lastName in userModel

```javascript
[
{ "firstName":"Nader1"},
{"lastName":"Sayed2"}
]
```

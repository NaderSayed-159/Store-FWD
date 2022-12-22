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

**install npm packages using**

```plaintext
npm i
```

**To run the application you can use script**

```plaintext
npm run dev
```

**To run the application tests**

```plaintext
npm run test
```

the application will run on route' http://localhost:3000 '

## Features

* you can create the 1st user without token but the 2nd one you will need to login and get the token to do anything
* to do any action needs token you need at least one user you will be warned if there is no users but if there will warned that you need auth
* add product to cart will check automatically the active order of the logined user and use its id to add product to cart
* if no active orders will create a new order with active statu
* to close the order you can use confirm route to convert its statu from active to completed and collect order products and its quantites from cart tabel and update order record in order table
* some actions needs that the logined user has the same id of the action requirments for example you can't get the orders of another user just you can get your orders
* updating password can't be done using updating user route it has its own route and it will encrypted too
* if you add the same product to cart in diffrent request it will check if there is same product in same order id will update the record in cart by adding the old quantity with new quantity

## Work Cycle 

- **Using [ POST ] verb on below routes**

* Create new user '/users'

  ```json
  {
  "firstname":"Nader",
  "lastName": "Saysd",
  "loginName" : "admin",
  "password" : "Pass123$"
  }
  ```
* Login using auth route '/users/auth'

  ```json
  {
   "loginName": "admin",
    "password": "Pass123$"
  }
  ```
* Create product Category '/products/categories'

  ```json
  {
  categoryName:"Metal"
  }
  ```
* Create new product '/products'

  ```json
  {
  "productname":"chair",
  "productprice":5,
  category_id:1
  }
  ```
* Use add product to cart route ( new order automatically) '/orders/products'

  ```json
  {
  "product_id":1,
  "quantity":5
  }
  ```

## JWT token of login

You can can call 'http://localhost:3000/users/auth' by [ **POST** ] request with loginName and password

```javascript
{
"loginName":"admin1",
"password":"Pass123$"
}
```

after copying token form response put it in header actions that need authentications as authoriztion key and in value put "bearer Token"

## For any update request in any model

you need to send the updates in form of Array of objects for each updated value for example to update firstName and lastName in userModel

```javascript
[
{ "firstName":"Nader1"},
{"lastName":"Sayed2"}
]
```

# Store-FWD

First of All You can start the project using Command

npm run dev


you need main database with name 'STORE_FWD';

after running migrations to create the tables


you can start send requests on ' http://localhost:3000 '

## for users

first of all you just need to un comment the code line 90 to add 1st user without and comment line **91**

then you can do all request on ' http://localhost:3000/users'

* get all users use **get** method
* get user by id use **get** method on ' http://localhost:3000/users/userid '
* create user by **post** method
* update use **put** method
* delete user by **delete** method

## for orders

only the route will change to  be  ' http://localhost:3000/orders'

## for products

only the route will change to be ' http://localhost:3000/products'


to do any update in any model
you need to send the updates in for array of objects of each update for example to update firstName and lastName


```javascript
[
{ "firstName":"Nader1"},
{"lastName":"Sayed2"}
]
```

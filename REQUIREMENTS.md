# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Users

- Index [token required]
  * HTTP method : GET
  * route : ' /users '
- Show [token required]
  * HTTP method : GET
  * route : ' /users/:id
- Create [token required]
  * HTTP method : POST
  * route : ' /users '
  * request Ex:

    ```json
    {
    "firstname":"Nader",
    "lastName": "Saysd",
    "loginName" : "admin",
    "password" : "Pass123$"
    }
    ```

* Update User
  * HTTP method : PUT
  * route : '/users/:id'
  * request EX:
  * ```json
    [
    {"lastName":"Bauomi"},
    ]
    ```
* Delete User
  * HTTP method : Delete
  * route : '/users/:id'
* Auhenticate User
  * HTTP method : POST
  * route : '/users/auth'
  * request Ex:
    ```json
    {
     "loginName": "admin",
      "password": "Pass123$"
    }
    ```
* Update password
  * HTTP method : POST
  * route : '/users/:id/password'
  * request Ex:
  * ```json
    {
    "password": "newPass"
    }
    ```

#### Products

- Index
  * HTTP method : GET
  * route : ' /products
- Show
  * HTTP method : GET
  * route : '/products/:id'
- Create [token required]
  * HTTP method : POST
  * route : '/products'
  * request Ex :
    ```json
    {
    "productname":"chair",
    "productprice":5,
    category_id:1
    }
    ```
- Update [token required]
  * HTTP method : PUT
  * route : '/product/:id'
  * request Ex:
    ```json
    [
    {"productname":"bed"},
    {"productprice":100}
    ]
    ```

* Delete [token required]
  * HTTP method : Delete
  * route : '/product/:id'

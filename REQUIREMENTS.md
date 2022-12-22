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

#### Products Categories

- Index
  * HTTP method : GET
  * route : ' /products/categories'
- Show
  * HTTP method : GET
  * route : '/products/categories/:id'
- Create [token required]
  * HTTP method : POST
  * route : '/products/categories'
  * request Ex :
    ```json
    {
    categoryName:"Metal"
    }
    ```
- Update [token required]
  * HTTP method : PUT
  * route : '/product/categories/:id'
  * request Ex:
    ```json
    [
    {"categoryName":"Wooden"}
    ]
    ```

* Delete [token required]
  * HTTP method : Delete
  * route : '/product/categories/:id'

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

#### Orders

- Index
  * HTTP method : GET
  * route : ' /oreders'
- Show
  * HTTP method : GET
  * route : '/orders/:id'
- Create [token required]
  * HTTP method : POST
  * route : '/orders'
  * request Ex :
    ```json
    {
    "productsoforder":"1,2",
    "productprice":"5,10",
    "user_id":1,
    "status":"active"
    }
    ```
- Update [token required]
  * HTTP method : PUT
  * route : '/oreders/:id'
  * request Ex:
    ```json
    [
    {"status":"completed"},
    ]
    ```

* Delete [token required]
  * HTTP method : Delete
  * route : '/orders/:id'
* Orders of User [token required]
  * HTTP method : GET
  * route :'users/:userid/orders'
* confirm Order [token required]
  * HTTP method : POST
  * route : 'orders/:orderId/confirm

#### Order Product Table

* Products of order [token required]

  * HTTP method :  GET
  * route : 'orders/:orderid/products'
* Add product to cart [token required]

  * HTTP method : POST
  * route : '/orders/products'
  * resuest Ex :

    ```json
    {
    "product_id":1,
    "quantity":5
    }
    ```
* Remove from cart [token required]

  * HTTP method : DELETE
  * route: '/orders/:order_id/products/:id'

## Database shapes

### users

* id [integer]
* firstname [varchar]
* lastname [varchar]
* loginname [varchar]
* password [varchar]

### products_categories

* id [integer]
* categoryname [varchar]

### products

* id [integer]
* productname [varchar]
* productprice [varchar]
* category_id [integer]

### orders

* id [integer]
* productsoforder [varchar]
* quantitesofproducts [varchar]
* user_id [integer]
* status [varchar]

### products_orders

* id [integer]
* order_id [integer]
* product_id [integer]
* quantity [integer]

# E-Commerce REST-API using TypeScript

## Routes

### For users
- `/users` (post)
    - to create a user
- `/signup` (post)
    - to sign up a user
- `/me` (get)
    - to get the current user in based on auth token (role based auth)

## Role based routes

### For products
- `/products` (post)
    - to create a product
- `/products/:id` (get, put, delete)
    - fetch, update, and delete a single product
- `/products` (get)
    - search for products, this will include full text search

### For cart
- `/cart` (post)
    - to add a product to the cart
- `/cart` (get)
    - to get all the products in the cart
- `/cart` (put)
    - to update the quantity of a product in the cart

### For orders
- `/orders` (post)
    - to create an order from the cart
- `/orders` (get)
    - to get all the orders
- `/orders/:id` (get)
    - to get a single order
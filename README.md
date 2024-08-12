# Barb Shoe Store Inventory Management System

This project is an inventory management system for Barb Shoe Store, designed to manage products, sales, and deliveries. The system supports two types of users: **Admin** (store owner) and **Clients** (customers). The Admin can manage the inventory, while Clients can view and purchase products.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Features

### Admin Capabilities

- **Add New Products**: Create new products with details like name, description, price, stock quantity, and variations (e.g., size, color).
- **Edit Products**: Update existing product details, including stock and price.
- **View Stock Levels**: Monitor stock levels for all products and receive notifications when stock is low.
- **Hide Products**: Hide products from clients when out of stock or discontinued.
- **Manage Product Variations**: Specify different variations for each product.

### Client Capabilities

- **View Products**: Browse available products, with details such as name, description, price, and variations.
- **Mock Purchase**: Simulate the purchase process, adding products to the cart and checking out.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest
- **Deployment**: Heroku, AWS, or DigitalOcean

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/yourusername/barb-shoe-store.git
   cd barb-shoe-store
   ```

2. **Install dependencies:**
   ```
   npm install
   ```
3. **Run the application:**
   ```
   npm start
   ```
4. **Environment Variables:**

   Create a .env file in the root directory with the following variables:

   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PORT=your_port_number
   ```

### Database Schema

- Users: Stores admin and client details.
- Products: Stores product details including name, description, price, and stock quantity.
- Product_Variations: Stores variations of products (e.g., size, color).
- Orders: Stores orders placed by clients.
- Order_Items: Stores details of items within an order.
- Notifications: Stores stock notifications.

### API Endpoints

##### Admin Endpoints

- Add a New Product: POST /api/products
- Edit a Product: PUT /api/products/:id
- View All Products: GET /api/products
- View a Specific Product: GET /api/products/:id
- Hide a Product: POST /api/products/:id/hide
- View Notifications: GET /api/notifications

##### Client Endpoints

- View Products: GET /api/products
- View a Specific Product: GET /api/products/:id
- Add to Cart: POST /api/cart
- Complete a Purchase: POST /api/orders
- View Order Details: GET /api/orders/:id

### Testing

- Run tests using Jest and Supertest:
  ```
  npm test
  ```

### Deployment

- Deploy to Render:
- Connect the repository to Render.
- Set up environment variables on Render.
- Deploy the application.

### License

This project is licensed under the MIT License - see the LICENSE file for details

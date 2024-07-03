# 🛍️ Enhanced Shopping Mall SJ

![Main Page](./public/image/mainpage.png)
SJ is a website where users can conveniently purchase a variety of clothes.

### Development Period

- Total Development Period: 2024-05-15 to 2024-06-16
- Backend Implementation: 2024-06-03 to 2024-06-08
- Frontend and Feature Implementation: 2024-06-06 to 2024-06-16

### Deployment Links

<div>Frontend Server: <a href="https://sj-shopping-mall.netlify.app/account/profile">https://sj-shopping-mall.netlify.app/account/profile</a></div>
<div>Backend Server: <a href="http://sj-shopping-mall.ap-southeast-2.elasticbeanstalk.com/">http://sj-shopping-mall.ap-southeast-2.elasticbeanstalk.com/</a></div>
<br>

### Test Account

- <b>Test ID</b>: admin@gmail.com
- <b>Test PW</b>: 123

## Project Introduction

<b>SJ</b> is a project where we implemented a shopping mall through clone coding.

- We have designed the main page to allow users to choose their desired products.
- The admin page allows the registration, modification, and deletion of products, orders, and user information.
- Users can select the size of their desired product and proceed to checkout.
  <br>

## Developer

<table>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/35758170?v=4" width="150" height="150"/></td>
  </tr>
  <tr>
    <td style="text-align: center;">Sung U Jung<br/><a href="https://github.com/SungJung0616">@SungJung0616</a></td>
  </tr>
</table>

<br>

# Project Overview

## User Features

1. **Sign Up**
   ![Sign Up](./public/image/signup.png)

2. **Login**

   - Email login
   - External account login
     ![Login](./public/image/login.png)

3. **Shopping Mall Landing Page**

   - Search functionality
   - Logout button
   - Shopping bag button
   - My orders button
     ![Landing Page](./public/image/mainpage.png)

4. **Product Detail Page**

   - Add product to cart
   - Select product size
     ![Product Detail](./public/image/productDetail.png)

5. **Cart Page**

   - Display selected items
   - Modify item quantity
   - Delete items
   - Proceed to checkout
     ![Cart Page](./public/image/cartPage.png)

6. **Checkout Page**

   - Prevent checkout if stock is insufficient
     ![Checkout Page](./public/image/payment.png)

7. **Order Completion Page**

   - Display order number
   - View order details and status
     ![Order Completion Page](./public/image/orderPage.png)

## Admin Page

1. **Product List Page**

   - Add new products
   - Search products
   - Edit and delete product information
   - Pagination
     ![Admin Product List](./public/image/adminProduct.png)

2. **Order Page**

   - View order details
   - Update order status
   - Search by order number
     ![Admin Order Page](./public/image/adminOrder.png)

3. **User Page**

   - View user details
   - Update user level
     ![Admin User Page](./public/image/adminUser.png)

## ERD

![Database Schema](./public/image/ERD.png)

<br>

## Implementation Plan

## 📚 STACKS

### Environment

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### Config

<img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white">

### Development

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

### deployment

<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"> <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7">

<br>

### Build the User Interface

- Create the landing page with search, login, and navigation functionalities.
- Implement the product detail page with size selection and add-to-cart functionality.
- Develop the cart page to display, modify, and delete items.
- Create the checkout process with stock verification.
- Design the order completion page with order details and status tracking.

### Admin Interface

- Build the product list page with add, search, edit, delete functionalities, and pagination.
- Create the order page for viewing and updating order details.

### Integration and Testing

- Integrate frontend and backend.
- Implement unit and integration tests to ensure all functionalities work as expected.

### Deployment

- Deploy the application to a hosting service (MongoDB Atlas, backend on AWS, frontend on Netlify).

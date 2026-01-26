# TrendTrove - E-Commerce Platform

TrendTrove is a full-stack E-Commerce application built with React.js, Node.js, MongoDB, Express.js, Razorpay API. It features a robust backend for managing products, users, orders, and payments.

## Features

- **User Authentication**: Secure login and registration with JWT and cookies.
- **Product Management**: Browse, search, and filter products. Admin dashboard for product creation and management.
- **Shopping Cart**: Add items to cart, update quantities, and checkout.
- **Order Management**: Track order status and history.
- **Payment Integration**: Secure payments powered by Razorpay.
- **User Profiles**: Manage account details.
- **Admin Panel**: Comprehensive dashboard to manage products and orders

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, Material UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Razorpay
- **Image Storage**: AWS S3
- **CDN**: CloudFront
- **Deployment**: AWS EC2

### Backend Setup

1. **Navigate to the Backend directory:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `config/config.env` file in the `Backend` directory with the following keys:
   ```env
   PORT=5000
   DB_URL=your_mongodb_uri
   FRONTEND_URL=http://localhost:5173
   
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=5d
   COOKIE_EXPIRE=5
   
   SMPT_SERVICE=gmail
   SMPT_MAIL=your_email@gmail.com
   SMPT_PASSWORD=your_email_password
   SMPT_HOST=smtp.gmail.com
   SMPT_PORT=465
   
   RAZORPAY_API_KEY=your_razorpay_key
   RAZORPAY_API_SECRET=your_razorpay_secret

   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_REGION=
   AWS_S3_BUCKET_NAME=

   CLOUDFRONT_DOMAIN=
   CLOUDFRONT_KEY_PAIR_ID=

   ```

4. **Start the Backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
3. **Configure Environment Variables:**
   Create a `.env` file in the `Frontend` directory with the following key:
   ```env
   VITE_BACKEND_URL=http://localhost:5000

3. **Start the Frontend development server:**
   ```bash
   npm run dev
   ```

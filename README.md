# 🛍️ MERN E-Commerce Platform

> A modern, production-ready full-stack e-commerce application with advanced features, seamless user experience, and comprehensive admin controls.

## 📖 Table of Contents

- [Features](#features)
- [Tech Stack](#️tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Configuration](#️configuration)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Security Features](#security-features)
- [Key Features Details](#key-features-details)

---

## ✨ Features

### 🔐 Authentication & Authorization

- **JWT-based Authentication**: Secure token-based login and registration
- **Role-based Access Control**: Separate user and admin dashboards
- **Protected Routes**: Server and client-side route protection
- **Persistent Sessions**: Token storage with automatic validation

### 🛒 Shopping Experience

- **Product Catalog**: Browse products with search, filtering, and pagination
- **Advanced Filtering**: Filter by category, price range, and ratings
- **Product Details**: Comprehensive product information with image galleries
- **Rating System**: Star-based product reviews and ratings
- **Shopping Cart**: Real-time cart management with local & database persistence
- **Wishlist**: Save favorite products for later

### 💳 Checkout & Orders

- **Multi-step Checkout**: Intuitive checkout flow with order summary
- **Order Tracking**: Real-time order status updates
- **Order History**: Complete order management in user dashboard
- **Secure Transactions**: Clean payment flow with shipping details

### 👨‍💼 Admin Dashboard

- **Product Management**: Create, update, and delete products
- **Inventory Tracking**: Monitor stock levels and inventory metrics
- **Order Management**: View and manage all customer orders
- **Analytics**: Sales metrics and user activity overview
- **User Management**: Control user accounts and permissions

### 🎨 User Interface

- **Responsive Design**: Mobile-first approach that works on all devices
- **Dark/Light Mode**: Theme switcher with persistent preferences
- **Premium Aesthetics**: Modern UI with smooth animations and transitions
- **Accessibility**: WCAG-compliant interactive components
- **Loading States**: Skeleton screens and smooth state transitions

### 🏗️ Technical Excellence

- **Clean Architecture**: Modular code structure for maintainability
- **Context API**: Global state management for auth, cart, and theme
- **Error Handling**: Comprehensive error messages and recovery flows
- **Image Management**: Cloudinary integration for scalable image hosting
- **Input Validation**: Server-side validation for all inputs

---

## 🛠️ Tech Stack

### Frontend

| Technology              | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| **React 19.2**          | UI framework with hooks and modern features |
| **Vite 7.3**            | Lightning-fast build tool and dev server    |
| **Tailwind CSS 4.2**    | Utility-first CSS framework for styling     |
| **Framer Motion 12.35** | Animation library for smooth transitions    |
| **Lucide React**        | Beautiful, consistent icon library          |
| **Axios 1.13**          | HTTP client for API requests                |
| **React Router 7.13**   | Client-side routing and navigation          |
| **React Toastify 11**   | Toast notifications for user feedback       |

### Backend

| Technology         | Purpose                               |
| ------------------ | ------------------------------------- |
| **Node.js**        | JavaScript runtime environment        |
| **Express 5.2**    | Web application framework             |
| **MongoDB 9.3**    | NoSQL database for data persistence   |
| **Mongoose 9.3**   | MongoDB object modeling               |
| **JWT**            | JSON Web Tokens for authentication    |
| **bcryptjs 3.0**   | Password hashing and encryption       |
| **Multer 2.1**     | File upload middleware                |
| **Cloudinary 2.9** | Cloud image management service        |
| **CORS**           | Cross-Origin Resource Sharing support |
| **Dotenv**         | Environment variable management       |

### Development Tools

| Tool                  | Purpose                                |
| --------------------- | -------------------------------------- |
| **Nodemon**           | Auto-restart server during development |
| **ESLint 9.39**       | Code quality and style checking        |
| **PostCSS 8.5**       | CSS transformation tool                |
| **Autoprefixer 10.4** | Automatic vendor prefixing             |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v7.0.0 or higher) - Comes with Node.js
- **MongoDB** - Either [Local Installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Cloudinary Account** (optional, for image uploads) - [Sign Up](https://cloudinary.com/)

### System Requirements

- RAM: 4GB minimum
- Disk Space: 2GB for dependencies
- Internet Connection: Required for package installation

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```powershell
# Using HTTPS
git clone https://github.com/Prem324/e-commerce_platform.git
cd e-commerce-platform

# Or using SSH
git clone git@github.com:Prem324/e-commerce_platform.git
cd e-commerce-platform
```

### Step 2: Backend Setup

```powershell
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
# Copy the environment variables below and create a .env file
New-Item -Path ".env" -ItemType File
# Add the following variables:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000
# JWT_SECRET=your_secret_key_here
# CLOUDINARY_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Start backend server
npm start

# For development with auto-reload
npm run dev
```

### Step 3: Frontend Setup

```powershell
# Navigate to client directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

---

## 📂 Project Structure

```
e-commerce-platform/
│
├── 📄 README.md                 # Project documentation
├── 📄 package.json              # Root package configuration
│
├── 📁 server/                   # Backend (Node.js + Express)
│   ├── 📄 server.js             # Main server file
│   ├── 📄 package.json          # Backend dependencies
│   │
│   ├── 📁 config/
│   │   └── db.js                # MongoDB connection
│   │
│   ├── 📁 controllers/          # Business logic
│   │   ├── authController.js    # Auth logic (login, register)
│   │   ├── productController.js # Product CRUD operations
│   │   ├── cartController.js    # Cart management
│   │   └── orderController.js   # Order processing
│   │
│   ├── 📁 models/               # Database schemas
│   │   ├── User.js              # User model
│   │   ├── Product.js           # Product model
│   │   ├── Cart.js              # Cart model
│   │   └── Order.js             # Order model
│   │
│   ├── 📁 routes/               # API endpoints
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── productRoutes.js     # Product endpoints
│   │   ├── cartRoutes.js        # Cart endpoints
│   │   ├── orderRoutes.js       # Order endpoints
│   │   └── uploadRoutes.js      # File upload endpoints
│   │
│   ├── 📁 middleware/           # Express middleware
│   │   ├── auth.js              # JWT verification
│   │   └── errorMiddleware.js   # Error handling
│   │
│   ├── 📁 utils/
│   │   ├── cloudinary.js        # Cloudinary image upload
│   │   └── seeder.js            # Sample data seeder
│   │
│   └── 📁 uploads/              # Local upload storage
│
└── 📁 client/                   # Frontend (React + Vite)
    ├── 📄 package.json          # Frontend dependencies
    ├── 📄 vite.config.js        # Vite configuration
    ├── 📄 index.html            # HTML entry point
    ├── 📄 vercel.json           # Deployment config
    │
    ├── 📁 src/
    │   ├── 📄 App.jsx           # Root component
    │   ├── 📄 main.jsx          # App entry point
    │   ├── 📄 App.css           # Global styles
    │   ├── 📄 index.css         # Base styles
    │   │
    │   ├── 📁 components/       # Reusable UI components
    │   │   ├── Navbar.jsx       # Navigation bar
    │   │   ├── Footer.jsx       # Footer section
    │   │   ├── ProductCard.jsx  # Product card component
    │   │   ├── Breadcrumbs.jsx  # Breadcrumb navigation
    │   │   ├── StarRating.jsx   # Rating component
    │   │   ├── OrderStatusBadge.jsx # Order status display
    │   │   ├── ImageGallery.jsx # Product image gallery
    │   │   ├── SuccessModal.jsx # Success modal
    │   │   ├── AnimatedPage.jsx # Page animations
    │   │   ├── ProtectedRoute.jsx # Route protection
    │   │   └── ScrollToTop.jsx  # Scroll behavior
    │   │
    │   ├── 📁 pages/            # Page components
    │   │   ├── Home.jsx         # Landing page
    │   │   ├── ProductList.jsx  # Product listing
    │   │   ├── ProductDetails.jsx # Single product
    │   │   ├── Cart.jsx         # Shopping cart
    │   │   ├── Checkout.jsx     # Checkout process
    │   │   ├── Login.jsx        # Login page
    │   │   ├── Register.jsx     # Registration page
    │   │   ├── UserDashboard.jsx # User profile
    │   │   └── AdminDashboard.jsx # Admin panel
    │   │
    │   ├── 📁 context/          # Global state
    │   │   ├── AuthContext.jsx  # Auth state
    │   │   ├── CartContext.jsx  # Cart state
    │   │   └── ThemeContext.jsx # Theme state
    │   │
    │   ├── 📁 hooks/            # Custom React hooks
    │   │   └── useProducts.js   # Products hook
    │   │
    │   ├── 📁 services/         # API services
    │   │   ├── api.js           # Axios instance
    │   │   └── apiServices.js   # API function wrappers
    │   │
    │   ├── 📁 utils/            # Utility functions
    │   │   └── formatters.js    # Data formatting helpers
    │   │
    │   └── 📁 assets/           # Static assets
    │
    └── 📁 public/               # Public static files
```

---

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters

# Cloudinary (Optional - for image uploads)
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# CORS
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (.env or .env.local)

```env
VITE_API_URL=http://localhost:5000
```

### MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add IP to whitelist (0.0.0.0 for development)
4. Create database user
5. Copy connection string to `MONGO_URI`

### Cloudinary Setup (Optional)

1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Copy credentials to .env file
3. This enables image upload functionality

---

## 📡 API Endpoints

### Authentication

```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
POST   /api/auth/logout            # Logout user
GET    /api/auth/profile           # Get user profile (protected)
```

### Products

```
GET    /api/products               # Get all products (with filters)
GET    /api/products/:id           # Get product by ID
POST   /api/products               # Create product (admin only)
PUT    /api/products/:id           # Update product (admin only)
DELETE /api/products/:id           # Delete product (admin only)
GET    /api/products/search/:query # Search products
```

### Cart

```
GET    /api/cart                   # Get user's cart (protected)
POST   /api/cart                   # Add item to cart (protected)
PUT    /api/cart/:productId        # Update cart item (protected)
DELETE /api/cart/:productId        # Remove from cart (protected)
DELETE /api/cart                   # Clear cart (protected)
```

### Orders

```
GET    /api/orders                 # Get user's orders (protected)
POST   /api/orders                 # Create order (protected)
GET    /api/orders/:id             # Get order details (protected)
PUT    /api/orders/:id             # Update order status (admin only)
GET    /api/orders/admin/all       # Get all orders (admin only)
```

### File Upload

```
POST   /api/upload                 # Upload image to Cloudinary
```

---

## 🎯 Usage Guide

### User Journey

#### 1. Browse Products

- Visit the home page
- Navigate to "Products" section
- Use filters to find specific items
- Click on a product to view details

#### 2. Add to Cart

- Click "Add to Cart" on product details
- Adjust quantity as needed
- Continue shopping or go to cart

#### 3. Checkout

- Navigate to Cart page
- Review items and quantities
- Click "Proceed to Checkout"
- Fill in shipping information
- Review order summary
- Complete purchase

#### 4. Track Orders

- Login to your account
- Go to "My Orders" dashboard
- View order status and details
- Track shipping information

### Admin Tasks

#### 1. Manage Products

- Login with admin account
- Navigate to Admin Dashboard
- Create, edit, or delete products
- Upload product images

#### 2. Manage Inventory

- Monitor stock levels
- Update product quantities
- View inventory metrics

#### 3. Manage Orders

- View all customer orders
- Update order statuses
- Track order fulfillment

---

## 🔐 Security Features

### Authentication & Authorization

- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected API routes with middleware
- ✅ Role-based access control (User/Admin)
- ✅ Secure token storage in localStorage

### API Security

- ✅ CORS configuration for safe cross-origin requests
- ✅ Input validation and sanitization
- ✅ Error handling without exposing sensitive info
- ✅ Environment variables for sensitive data

### Database Security

- ✅ MongoDB Atlas connection encryption
- ✅ Database user permissions
- ✅ IP whitelist for connections

---

## 📸 Key Features Details

### Product Search & Filtering

- Real-time search across product names and descriptions
- Filter by categories, price range, and ratings
- Pagination for large product lists
- Sorting options (newest, price, rating)

### User Profiles

- Complete account management
- Order history and tracking
- Saved addresses (coming soon)
- Wishlist functionality

### Admin Controls

- Comprehensive dashboard with metrics
- Real-time inventory tracking
- Order management system
- User activity monitoring
- Analytics and reports

### Mobile Responsive

- Optimized for mobile-first design
- Touch-friendly interface
- Responsive navigation
- Adaptive layouts

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Backend Deployment

- **Heroku**: Connect GitHub repository
- **Railway**: Drag-and-drop deployment
- **Render**: Easy deployment with PostgreSQL
- **AWS/GCP**: Manual Docker containerization

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

### Port Already in Use

```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000

# Kill the process (Windows)
Stop-Process -Id <PID> -Force

# Or change PORT in .env
```

### MongoDB Connection Error

- Verify MongoDB is running
- Check connection string in .env
- Ensure IP is whitelisted (MongoDB Atlas)
- Test connection with: `mongosh "your_connection_string"`

### Module Not Found

```powershell
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### CORS Issues

- Check CORS_ORIGIN in backend .env
- Verify frontend URL matches
- Ensure credentials are properly configured

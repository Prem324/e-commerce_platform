# MERN E-Commerce Platform 🚀

A production-style full-stack e-commerce application built with the MERN stack.

## ✨ Features

- **Authentication**: JWT-based login/register with route protection.
- **Product System**: Advanced listing with search, category filtering, and pagination.
- **Cart System**: Real-time cart management with local and database persistence.
- **Checkout Flow**: Secure multi-step checkout with order summary and shipping details.
- **Admin Dashboard**: Comprehensive management of products, inventory metrics, and orders.
- **Responsive Design**: Mobile-first premium UI built with Tailwind CSS and Lucide icons.
- **Clean Architecture**: Modular backend services and context-based frontend state.

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router, Context API.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Multer.
- **UI/UX**: Premium aesthetic with dark/light mode focus, custom color palettes, and smooth transitions.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas)

### Setup

1. **Clone the repository**
2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create .env file with your credentials (see .env.example)
   node utils/seeder.js # Optional: Seed sample data
   npm start
   ```
3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 📂 Project Structure

```text
/server
  /config         # Database and third-party configs
  /controllers    # Business logic
  /models         # Mongoose schemas
  /routes         # API endpoints
  /middleware     # Global and route-specific middleware
  /utils          # Helpers and seeders

/client
  /src
    /components   # Reusable UI parts
    /pages        # Top-level views
    /context      # State management (Auth, Cart)
    /services     # API abstraction
    /hooks        # Custom React hooks
```

## 📄 License

MIT

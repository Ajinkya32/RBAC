# 🛡️ RBAC using MERN

A Role-Based Access Control (RBAC) system built using the MERN stack (MongoDB, Express, React, Node.js).

Live Link: https://rbac.ajinkyadev.com/

Test credentials:
1. Admin
Email: admin@gmail.com
Password: admin

2. Manager
Email: manager1@gmail.com
Password: manager

3. Employee
Email: employee1@gmail.com
Password: employee

---

## 🔧 Features

### ✅ Authentication & Authorization

- User registration and login (email/password)
- Session-based authentication with Passport.js and Express Session.
- Role-based permission system
- Middleware-based access control
- 🔒 **Type-safe access checks using Enums & custom guards**

### ✅ Role Management

- Default roles: `ADMIN`, `MANAGER`, `EMPLOYEE`.
- Predefined permission groups (Products, Users, Orders, Teams, etc.)
- UI to add/remove permissions from roles
- Dynamic role guards on backend and frontend

### ✅ Team Management

- Create, edit, delete teams
- Assign users as employees or managers to teams
- Each user can belong to multiple teams

### ✅ Product Management

- Create, update, delete products with image upload
- Image preview and validation
- List all products with quantity selection
- Place orders

### ✅ Order Management

- Create orders with quantity and price
- View order list with table filters
- Recent orders widget

### ✅ Members

- Add/remove team members
- Permission-based role updates

### ✅ Dashboard

- Recent members and recent orders tabbed view
- Team analytics and activity insights

---

## 📦 Tech Stack

- **Frontend (React + TypeScript)**: React, TypeScript, Tailwind CSS, ShadCN UI, React Hook Form, Zod, TanStack Query
- **Backend (Express + TypeScript)**: Node.js, Express, MongoDB, Passport.js, Mongoose, Multer
- **Others**: Axios, React Router, Lucide Icons

---

## 🧠 Type Safety Highlights

- 🟦 **Backend**:

  - All models use strict Mongoose Types
  - Enum-based permission control (`Permissions`, `Roles`)
  - Centralized Zod validation for all request payloads
  - Typed service layers and error handlers

- 🟨 **Frontend**:
  - `ProductType`, `UserType`, `OrderType` etc. from `@/types/api.type`
  - Strong typing in API handlers (`axios` with generics)
  - Permission enums shared across components
  - Component-level prop validation
  - Type-safe forms with automatic type inference from Zod

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ajinkya32/RBAC.git
cd RBAC
```

---

### 2. 📁 Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install the dependencies using npm.
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory using the variables mentioned in `.env.example`.
4. Run Roles Seeding for adding default roles and permissions to DB.
   ```bash
   npm run seed
   ```
5. Run the development server using npm.
   ```bash
   npm run dev
   ```
6. Access the backend at `http://localhost:8000`.

---

### 3. 💻 Frontend Setup

1. Navigate to the frontend folder.
   ```bash
   cd frontend
   ```
2. Install the dependencies using npm.
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory using the variables mentioned in `.env.example`.
4. Run the development server using npm.
   ```bash
   npm run dev
   ```
5. Access the frontend at `http://localhost:5173`.

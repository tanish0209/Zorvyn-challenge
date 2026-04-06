# Finance Data Processing & Access Control Backend

A production-ready finance dashboard backend built with **Node.js**, **Express**, **TypeScript**, and **Prisma**.

## 🚀 Overview
This system provides a logically structured backend for managing financial records with robust Role-Based Access Control (RBAC). It includes specialized APIs for dashboard summaries, data aggregation, and user management.

## 🛠️ Tech Stack
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Auth**: JSON Web Tokens (JWT) & Bcrypt
- **Deployment-Ready**: Structured into Controllers, Services, and Middlewares

## 🛡️ Role-Based Access Control
The system enforces security levels based on three distinct roles:
1. **Viewer**: Read-only access to basic dashboard summaries.
2. **Analyst**: Access to granular financial records and advanced insights (category totals, trends).
3. **Admin**: Full authority – Create, Update, and Delete records, plus User management.

## 📊 Core APIs

### Authentication
- `POST /api/auth/register` - Create a new user (Default Role: VIEWER).
- `POST /api/auth/login` - Authenticate and receive a JWT.
- `PATCH /api/auth/users/:userId` - Update user role or status (Admin Only).

### Financial Records
- `GET /api/records` - List records with filtering (Date range, Type, Category).
- `POST /api/records` - Add a new transaction (Admin Only).
- `PATCH /api/records/:id` - Modify an entry (Admin Only).
- `DELETE /api/records/:id` - Remove an entry (Admin Only).

### Dashboard & Analytics
- `GET /api/dashboard/summary` - Total Income, Expense, and Net Balance.
- `GET /api/dashboard/categories` - Categorical spending/earning breakdown (Analyst/Admin).
- `GET /api/dashboard/trends` - Recent activity and trend logging (Analyst/Admin).

## ⚙️ Setup & Installation
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Variables**:
   Create a `.env` file with:
   ```env
   DATABASE_URL="postgresql://..."
   JWT_SECRET="your_secret_key"
   PORT=3000
   ```
3. **Database Sync**:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
4. **Build & Start**:
   ```bash
   npm run build
   npm start
   ```
   *For development:* `npm run dev`

## 🧩 Architectural Decisions
- **Prisma Client Initialization**: Centralized in `src/prisma.ts` to prevent multiple connection overhead.
- **Middleware Guard**: Specialized `authorize([])` middleware that scales to any number of roles.
- **Data Aggregation**: Utilized Prisma's `groupBy` for efficient backend calculation of summary stats, reducing frontend complexity.
- **Strict Typing**: Full TypeScript coverage for request params and DB models to catch errors at compile-time.

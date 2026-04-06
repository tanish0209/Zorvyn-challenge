# Zorvyn Financial Management Dashboard

A premium, role-based financial management platform designed for organizational transparency and data-driven decision-making. Built with **Next.js**, **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

---

## Introduction
This is a modern web application designed originally as a **Backend Engineering challenge**, with a primary focus on secure API development, Role-Based Access Control (RBAC), and robust data validation. To provide a complete, interactive experience, I developed a premium **Next.js Frontend** as a feature-rich extension to demonstrate full-stack integration, modern UI/UX design, and complex client-side state management.

Whether you are a **Viewer** reviewing departmental reports, an **Analyst** auditing spending trends, or an **Admin** managing the entire platform's data and user base, Zorvyn provides a tailored, secure experience for every role through its deeply integrated backend and frontend architecture.

---

## Features

### Multi-Role Architecture
- **Admin Dashboard**: Full CRUD (Create, Read, Update, Delete) capability for financial records and a dedicated User Management suite to assign roles and control system access.
- **Analyst Dashboard**: Specialized insights view featuring categorical data distribution charts and advanced auditing logs.
- **Viewer Dashboard**: A clean, read-only summary for stakeholders to review financial health without modifying data.

### Advanced Filtering & Auditing
- **Categorical Dropdowns**: Effortlessly filter across all historical categories populated dynamically from your transaction set.
- **Transaction Type Filtering**: Quick-toggle between Inflow (Income), Outflow (Expense), or All activity.
- **Timeframe Filtering**: Select custom Start and End date ranges (including single-day auditing) to report on specific fiscal periods.
- **Debounced Interaction**: High-performance filtering ensuring 0ms lag during user interaction.

### Modern Security
- **JWT Authentication**: Secure, token-based authentication session management.
- **Role-Gated Path Protection**: Strict Layout-level guards prevent "role-hopping" via manual URL manipulation.
- **Server-Side Authorization**: Every API endpoint is hardened with RBAC (Role-Based Access Control) middleware.

---

## Setup Instructions

### 1. Prerequisites
- **Node.js**: v18 or higher recommended.
- **PostgreSQL**: A running instance (or a hosted service like Supabase/Neon).

### 2. Server Setup (Backend)
1. **Navigate to the server directory**:
   ```bash
   cd server
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configuration**: 
   Create a `.env` file in the `server` root:
   ```env
   PORT=5001
   DATABASE_URL="postgresql://user:password@localhost:5432/finance_db"
   JWT_SECRET="your_secure_random_secret"
   ```
4. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. **Start Development Server**:
   ```bash
   npm run dev
   ```

### 3. Client Setup (Frontend)
1. **Navigate to the client directory**:
   ```bash
   cd client
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configuration**:
   Create a `.env` file in the `client` root:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5001/api"
   ```
4. **Start Development Server**:
   ```bash
   npm run dev
   ```

---

## Challenges & Resolutions

During development, we encountered several architectural and environmental hurdles. Here is how we overcame them:

### Challenge 1: "Role-Hopping" Security Flaw
- **Problem**: While the UI hid unauthorized links, a **Viewer** could still manually type `/admin` in the browser URL and access privileged pages (though data was blocked from the API).
- **Resolution**: Refined the Next.js routing architecture by creating role-specific `layout.tsx` files. This implements a **Render Guard**—the page content never mounting if the session role doesn't match the required segment, redirecting them instantly.

### Challenge 2: Prisma Update Validation Crashes
- **Problem**: When editing a record, the Prisma `update` call would crash with an `Unknown argument userId` error. This happened because the client was sending back the full "heavy" object returned from the API (including relation objects like `user`).
- **Resolution**: Built a stricter **Validation Middleware** on the server that uses Zod to "strip" unknown incoming fields. This ensures that only the lean, intended data reaches the Prisma layer, keeping the database operations clean and safe.

### Challenge 3: Temporal Filtering Logic
- **Problem**: Implementing filtering that combined Category, Type, and Date Range across multiple dashboards resulted in complex, redundant fetch code.
- **Resolution**: Modularized the fetching into a `useCallback` hook that builds a dynamic `URLSearchParams` object. This allowed us to unify the experience across all dashboards while maintaining a clean, reactive UI.

---

## Technology Stack
- **Frontend**: Next.js 14, Tailwind CSS, Axios, Lucide Icons.
- **Backend**: Node.js, Express, TypeScript, Zod.
- **Database**: PostgreSQL with Prisma ORM.

---
Developed as part of the Zorvyn Challenge.

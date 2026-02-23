# SkillBridge Backend

Backend API for the SkillBridge tutoring platform built with Node.js, Express, TypeScript, and Prisma.

## Features

- User authentication with JWT
- Role-based access control (Student, Tutor, Admin)
- Tutor profile management
- Booking system with availability checking
- Review and rating system
- Admin dashboard with statistics
- Category management

## Tech Stack

- Node.js & Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Update `.env` file with your database credentials.

3. Run Prisma migrations:
```bash
npm run prisma:migrate
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Seed the database:
```bash
npm run prisma:seed
```

6. Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:5000`

## Default Users (After Seeding)

- Admin: `admin@skillbridge.com` / `Admin@123`
- Tutor: `john.doe@example.com` / `password123`
- Student: `alice.johnson@example.com` / `password123`

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Tutors
- GET /api/tutors
- GET /api/tutors/:id
- PUT /api/tutors/profile
- PUT /api/tutors/availability

### Bookings
- POST /api/bookings
- GET /api/bookings
- GET /api/bookings/:id
- PATCH /api/bookings/:id/status
- POST /api/bookings/:id/cancel

### Reviews
- POST /api/reviews
- GET /api/reviews/tutor/:tutorId
- PUT /api/reviews/:id
- DELETE /api/reviews/:id

### Admin
- GET /api/admin/users
- PATCH /api/admin/users/:id/status
- GET /api/admin/bookings
- GET /api/admin/stats
- POST /api/admin/categories
- PUT /api/admin/categories/:id
- DELETE /api/admin/categories/:id

### Categories
- GET /api/categories
- GET /api/categories/:id

# Recipe Finder - Final Project with User Authentication

This version includes user authentication.

## Added Features

- User registration
- User login
- Logout
- Protected Add Recipe page
- Protected Feedback page
- Token-based authentication using Node.js crypto
- Password hashing using PBKDF2
- MongoDB User model

## Backend Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Protected Recipe Routes

These routes now need a login token:

- `POST /api/recipes/add`
- `PUT /api/recipes/feedback`

Public routes are still open:

- `GET /api/recipes/categories`
- `GET /api/recipes/category/:category`
- `GET /api/recipes/dish/:dish`

## How to Run

### Backend

```bash
cd backend
npm install
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

Make sure MongoDB is running locally.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on the Vite URL shown in the terminal.

## Important Files Added

Backend:

- `models/User.js`
- `controllers/authController.js`
- `routes/authRoutes.js`
- `middleware/authMiddleware.js`

Frontend:

- `context/AuthContext.jsx`
- `components/Login.jsx`
- `components/Register.jsx`
- `components/ProtectedRoute.jsx`

## Note

For a real production project, change `JWT_SECRET` in `backend/.env` to a stronger private value.

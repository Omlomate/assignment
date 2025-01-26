
# Auth System with Login and Register

This is a simple authentication system built using React for the frontend and Express.js for the backend. 
It supports user login and registration functionalities.

## Features

- **Login and Register on a single page** with conditional rendering.
- Secure user authentication using JWT tokens.
- Backend API integration for user authentication.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Omlomate/assignment
   cd auth-system
   ```

2. Install dependencies for both frontend and backend:

   **Frontend:**
   ```bash
   cd frontend
   npm install
   ```

   **Backend:**
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `backend` folder with the following content:

   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

4. Start the development servers:

   **Frontend:**
   ```bash
   cd frontend
   npm start
   ```

   **Backend:**
   ```bash
   cd backend
   npm start
   ```

## Usage

- Navigate to `http://localhost:3000` to access the application.
- Use the register form to create a new account.
- Use the login form to authenticate and access protected routes.

## Project Structure

```
auth-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   ├── server.js
│   ├── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── package.json
```

## Dependencies

### Frontend
- React
- React Router DOM
- Axios

### Backend
- Express.js
- MongoDB
- dotenv
- bcryptjs
- jsonwebtoken


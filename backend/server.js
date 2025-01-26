const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const path = require('path'); // Import path module for serving static files
const connectDB = require('./src/config/dbConfig'); 
const authRoutes = require('./src/routes/authRoutes'); 
const itemRoutes = require('./src/routes/itemRoutes'); // Import item routes

// Load Environment Variables
dotenv.config();

// Connect to MongoDB
connectDB(); // Calls the existing MongoDB connection logic from dbConfig

// Create Express App
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Serve static files from the 'frontend/build' directory (after React app is built)
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// For any other route that doesn't match an API route, serve the React app (index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

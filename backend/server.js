    const express = require('express');
    const bodyParser = require('body-parser');
    const dotenv = require('dotenv');
    const cors = require('cors'); // Import CORS
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

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/items', itemRoutes);

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Item = require("./models/Item"); // Import your Item model

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection Error:", err));

// Sample data for the table
const items = Array.from({ length: 20 }, (_, i) => ({
  name: `Item ${i + 1}`,
  dateOfBirth: new Date(2000, i % 12, (i % 28) + 1), // Randomized DOB
}));

// Seed function
const seedData = async () => {
  try {
    // Clear the collection
    await Item.deleteMany({});
    console.log("Cleared existing data");

    // Insert new data
    await Item.insertMany(items);
    console.log("Seed data inserted");
    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

// Execute the seeding function
seedData();

const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is configured

/**
 * Connects to MongoDB using the MONGO_URI environment variable.
 * @throws {Error} If connection fails
 */
const connectDB = async () => {
  try {
    // Log the URI to make sure it's loaded correctly
    console.log('MONGO_URI:', process.env.MONGO_URI);

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if server not found
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 10, // Max 10 simultaneous connections (adjust based on load)
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;



/**UPDATE FOR PRODUCTION
 * 
 * await mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.kkawl.mongodb.net/recruit?retryWrites=true&w=majority`,
); */
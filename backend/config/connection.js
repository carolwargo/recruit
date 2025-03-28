const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the MONGO_URI environment variable.
 * @throws {Error} If connection fails
 */
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s if server not found
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    maxPoolSize: 10, // Max 10 simultaneous connections (adjust based on load)
  });
};

module.exports = connectDB;


/**UPDATE FOR PRODUCTION
 * 
 * await mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.kkawl.mongodb.net/recruit?retryWrites=true&w=majority`,
); */
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging indefinitely
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);

    // Log additional error details if available
    if (error.code) console.error(`🛠 Error Code: ${error.code}`);
    if (error.reason) console.error(`🔍 Error Reason: ${error.reason}`);

    process.exit(1); // Exit process with failure
  }
};

// Event Listeners for MongoDB Connection
mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB Disconnected! Retrying...'));
mongoose.connection.on('error', (err) => console.error(`❌ MongoDB Error: ${err.message}`));

module.exports = connectDB;

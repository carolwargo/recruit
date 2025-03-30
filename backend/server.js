require('dotenv').config({ path: './.env' }); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const subscriberRoutes = require('./routes/subscribe');
const connectDB = require('./config/connection');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://recruit-jobo-44a0053a7548.herokuapp.com'  // Production URL
    : 'http://localhost:5173',  // Development URL
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Parse incoming JSON requests

// Request Logging Middleware
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Body: ${JSON.stringify(req.body)}`);
  } else {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  }
  next();
});

// Connect to MongoDB
connectDB()
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1); // Exit process on DB failure
  });

// Routes Setup
console.log('🚀 Initializing Routes...');
app.use('/api/auth', authRoutes);
console.log('✅ Auth routes loaded');
app.use('/api/user', userRoutes);
console.log('✅ User routes loaded');
app.use('/api/subscribe', subscriberRoutes);
console.log('✅ Subscribe routes loaded');

// Root Route (Optional - for testing)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Recruit API' });
});

// 404 Handler - Catch undefined routes
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`[${new Date().toISOString()}] ❌ Error (${status}): ${message}`, err.stack);
  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Show stack in dev
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received: Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received: Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message, err.stack);
  process.exit(1);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'Reason:', reason);
  process.exit(1);
});





/**
 * require('dotenv').config({ path: './.env' }); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const subscriberRoutes = require('./routes/subscribe');
const connectDB = require('./config/connection');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin (Vite default port)
  credentials: true, // Allow cookies/sessions if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Supported methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(express.json()); // Parse incoming JSON requests

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Connect to MongoDB
connectDB()
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1); // Exit process on DB failure
  });

// Routes Setup
console.log('🚀 Initializing Routes...');
app.use('/api/auth', authRoutes);
console.log('✅ Auth routes loaded');
app.use('/api/user', userRoutes);
console.log('✅ User routes loaded');
app.use('/api/subscribe', subscriberRoutes);
console.log('✅ Subscribe routes loaded');

// Root Route (Optional - for testing)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Recruit API' });
});

// 404 Handler - Catch undefined routes
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`[${new Date().toISOString()}] ❌ Error (${status}): ${message}`, err.stack);
  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Show stack in dev
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message, err.stack);
  process.exit(1);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'Reason:', reason);
  process.exit(1);
});
 */
require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const connectDB = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Logs
console.log('🔧 Initializing Middleware...');

app.use(cors({
    origin: 'http://localhost:5173',  // Ensure this matches your frontend
    credentials: true
}));  
console.log('✅ CORS configured');

app.use(express.json());
console.log('✅ JSON middleware enabled');

// Connect to Database
console.log('📡 Connecting to Database...');
connectDB().then(() => console.log('✅ Database Connected Successfully')).catch(err => console.error('❌ Database Connection Error:', err));

// Route Logs
console.log('🚀 Initializing Routes...');
app.use('/api/auth', (req, res, next) => {
    console.log(`🔹 [AUTH] ${req.method} ${req.originalUrl}`);
    next();
}, authRoutes);

app.use('/api/user', (req, res, next) => {
    console.log(`🔹 [USER] ${req.method} ${req.originalUrl}`);
    next();
}, userRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

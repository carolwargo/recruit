// Load environment variables first
require('dotenv').config({ path: './.env' }); // Explicitly point to backend/.env

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // This runs after dotenv
const connectDB = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
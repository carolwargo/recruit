const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('❌ JWT_SECRET is not defined in .env');

console.log('✅ User routes loaded');

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token;
  console.log('🔍 Checking token...');

  if (!token) {
    console.log('⚠️ No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(`✅ Token verified for user ID: ${decoded.id}`);
    next();
  } catch (error) {
    console.error('❌ Invalid token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  console.log(`📨 Fetching profile for user ID: ${req.user.id}`);

  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.log('⚠️ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`✅ User profile retrieved: ${user.email}`);
    res.json(user);
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  console.log(`✏️ Updating profile for user ID: ${req.user.id}`);

  try {
    const updates = req.body;
    console.log('🛠 Update data:', updates);

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      console.log('⚠️ User not found for update');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`✅ User profile updated: ${user.email}`);
    res.json(user);
  } catch (error) {
    console.error('❌ Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/profile', authMiddleware, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id, // From authMiddleware
        req.body,
        { new: true, runValidators: true }
      );
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
module.exports = router;

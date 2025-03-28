const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('❌ JWT_SECRET is not defined in .env');

console.log('✅ User routes loaded');

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('🔍 Checking token...');

  if (!token) {
    console.log('⚠️ No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/personal', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({ message: 'Personal profile saved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/athletic', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({ message: 'Athletic profile saved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/academic', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { platformConsent } = req.body;
    if (!platformConsent) return res.status(400).json({ message: 'Consent required' });

    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({ message: 'Academic profile saved. Intake complete!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/user/profile
// @desc    Get user profile data
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.log('⚠️ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`✅ User profile retrieved: ${user.email}`);
    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error fetching profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile (optional for future edits)
// @access  Private
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    console.log('🛠 Updating profile with:', updates);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      console.log('⚠️ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`✅ User profile updated: ${user.email}`);
    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error updating profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
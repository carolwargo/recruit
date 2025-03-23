const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
if (!JWT_SECRET) throw new Error('❌ JWT_SECRET is not defined in .env');

console.log('✅ Auth routes loaded');

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log(`📨 Signup attempt for email: ${email}`);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ Signup failed: User already exists');
      return res.status(400).json({ message: 'User exists' });
    }

    console.log('🔑 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();
    console.log(`✅ New user created: ${email}`);

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    console.log('🔐 Token generated for new user');

    res.status(201).json({ token });
  } catch (error) {
    console.error('❌ Signup Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`🔑 Login attempt for email: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('⚠️ Login failed: User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('🔍 Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('⚠️ Login failed: Incorrect password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    console.log('✅ Login successful, token generated');

    res.json({ token });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

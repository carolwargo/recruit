const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const validator = require('validator'); // Optional: npm i validator

// @route   POST /api/subscribe
// @desc    Subscribe an email to the newsletter
// @access  Public
router.post('/', async (req, res) => {
  const { email } = req.body;

  // Validate input
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  try {
    // Check for existing subscriber
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'This email is already subscribed' });
    }

    // Save new subscriber
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: 'Successfully subscribed' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
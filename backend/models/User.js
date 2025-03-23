const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
  phone: String,
  streetaddress: String,
  city: String,
  state: String,
  zipcode: String,
  highschool: String,
  hsLocation: String,
  currentYear: String,
  gradYear: String,
  dob: String,
  twitter: String,
  instagram: String,
  facebook: String,
  sport: String,
  hslevel: String,
  primaryPosition: String,
  secondaryPosition: String,
  handedness: String,
  height: String,
  weight: String,
  testScores: String,
  gpa: String,
  ncaaid: String,
  athleticExtra: String,
  academicExtra: String,
  bio: String,
  platformConsent: { type: Boolean, default: false },
  },

{ timestamps: true });

module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
   firstName: { type: String },
  lastName: { type: String },
  personalInfo: {
    highSchool: String,
    schoolLocation: String,
    dob: Date,
    gradYear: Number,
    currentYear: String,
    bio: String,
  },
  contactInfo: {
    mailingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      phone: String,
    },
    billingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      phone: String,
    },
    socialMedia: {
      instagram: String,
      facebook: String,
      twitter: String,
      pbrProfile: String,
    },
  },
  athleticProfile: {
    sport: String,
    position: {
      primary: String,
      secondary: String,
    },
    height: String,
    weight: Number,
    handedness: { type: String, enum: ['right', 'left', 'both'] },
    additionalInfo: String,
  },
  academicProfile: {
    ncaaId: String,
    actScore: Number,
    satScore: Number,
    gpa: Number,
    transcript: String, // URL or file path for upload
    additionalInfo: String,
  },
  mediaUploads: {
    videos: {
      offense: String, // URL
      defense: String,
      extra: String,
    },
    images: {
      profilePic: String, // URL
      headerImg: String,
      additional: [{ name: String, url: String }],
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
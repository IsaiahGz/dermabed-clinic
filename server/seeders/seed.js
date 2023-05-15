const db = require('../config/connection');
const userSeeds = require('./userSeeds.json');
const User = require('../models/User');
const Testimonial = require('../models/Testimonial');
const testimonialSeeds = require('./testimonialSeeds.json');

User.collection
  .insertMany(userSeeds)
  .then((data) => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

Testimonial.collection
  .insertMany(testimonialSeeds)
  .then((data) => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const db = require('../config/connection');
const userSeeds = require('./userSeeds.json');
const User = require('../models/User');
const Testimonial = require('../models/Testimonial');
const testimonialSeeds = require('./testimonialSeeds.json');
const productSeeds = require('./productSeeds.json');
const Product = require('../models/Product');

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

Product.collection
  .insertMany(productSeeds)
  .then((data) => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

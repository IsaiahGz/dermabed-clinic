const db = require('../config/connection');
const userSeeds = require('./userSeeds.json');
const User = require('../models/User');
const Testimonial = require('../models/Testimonial');
const testimonialSeeds = require('./testimonialSeeds.json');
const productSeeds = require('./productSeeds.json');
const Product = require('../models/Product');

const seedDatabase = async () => {
  try {
    await User.collection.deleteMany({});
    await User.collection.insertMany(userSeeds);
    const users = await User.find({}); // Fetch users from DB
    console.log('Users seeded!');

    const updatedTestimonialSeeds = testimonialSeeds.map((testimonial) => {
      const user = users[Math.floor(Math.random() * users.length)];
      testimonial.user = user._id;
      return testimonial;
    });

    await Testimonial.collection.deleteMany({});
    await Testimonial.collection.insertMany(updatedTestimonialSeeds);
    console.log('Testimonials seeded!');

    await Product.collection.deleteMany({});
    await Product.collection.insertMany(productSeeds);
    console.log('Products seeded!');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();

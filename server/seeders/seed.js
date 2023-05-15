const db = require('../config/connection');
const { Testimonial } = require('../models');
const testimonialSeeds = require('./testimonialSeeds.json');

db.once('open', async () => {
  await Testimonial.deleteMany({});
  await Testimonial.create(testimonialSeeds);

  console.log('all done!');
  process.exit(0);
});

const db = require('../config/connection');
const userSeeds = require('./userSeeds.json');
const User = require('../models/User');
// const testimonialSeeds = require('./testimonialSeeds.json');

User.collection
  .insertMany(userSeeds)
  .then((data) => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const { Testimonial } = require('../models');

const resolvers = {
  Query: {
    testimonials: async () => {
      return Testimonial.find();
    },

    testimonial: async (parent, { testimonialId }) => {
      return Testimonial.findOne({ _id: testimonialId });
    },
  },

  Mutation: {
    addTestimonial: async (parent, { testimonialText, }) => {
      return Testimonial.create({ testimonialText, });
    },
  
    removeTestimonial: async (parent, { testimonialId }) => {
      return Testimonial.findOneAndDelete({ _id: testimonialId });
    },
 
  },
};

module.exports = resolvers;

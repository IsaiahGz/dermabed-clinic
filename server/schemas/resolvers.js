const { Testimonial } = require('../models');

const resolvers = {
  Query: {
    testimonials: async () => {
      return Testimonial.find().sort({ createdAt: -1 });
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

    updateTestimonial: async (parent, { id, }) => {
     
      return await Testimonial.findOneAndUpdate(
        { _id: testimonialId }, 
        { new: true }
      );
    }
 
  },
};

module.exports = resolvers;

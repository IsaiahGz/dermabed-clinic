const { Testimonial } = require('../models');

const resolvers = {
  Query: {
    testimonials: async () => {
      return Testimonial.find().sort({ createdAt: -1 });
    },

    testimonial: async (parent, { testimonialId }) => {
      return Testimonial.findOne({ _id: testimonialId });
    },
    
    product: async (parent, { productId }) => {
      return Product.findOne({ _id: productId });
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
        { _id: Testimonial }, 
        { new: true }
      );
    },
    
    addProduct: async (parent, { product, }) => {
      return Product.create({ product, });
    },
  
    removeProduct: async (parent, { product }) => {
      return Product.findOneAndDelete({ _id: productId });
    },

    updateProduct: async (parent, { Product, }) => {
      return await Product.findOneAndUpdate(
        { _id: productId }, 
        { new: true }
      );
    }
 
  },
};



module.exports = resolvers;




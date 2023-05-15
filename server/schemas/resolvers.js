const { Testimonial, Product, User } = require('../models');

const resolvers = {
  Query: {
    testimonials: async () => {
      return Testimonial.find().sort({ createdAt: -1 }).populate('user');
    },

    testimonial: async (parent, { testimonialId }) => {
      return Testimonial.findOne({ _id: testimonialId }).populate('user');
    },
    
    product: async (parent, { productId }) => {
      return Product.findOne({ _id: productId });
    },
    
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    
    users: async () => {
      return User.find();
    },
  },

  Mutation: {
    addTestimonial: async (parent, { testimonialText, userId, }) => {
      return Testimonial.create({ testimonialText, user: userId, });
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
      return Product.findOneAndDelete({ _id: product });
    },

    updateProduct: async (parent, { Product, }) => {
      return await Product.findOneAndUpdate(
        { _id: productId }, 
        { new: true }
      );
    },
   
    addUser: async (parent, args) => {
      return User.create({...args})
    },
  
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    updateUser: async (parent, { User, }) => {
      return await User.findOneAndUpdate(
        { _id: User }, 
        { new: true }
      );
    }
 
  },
};



module.exports = resolvers;




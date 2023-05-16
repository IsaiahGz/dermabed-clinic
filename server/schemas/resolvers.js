const { Testimonial, Product, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

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
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
	},

  Mutation: {
    addTestimonial: async (parent, { testimonialText, userId }, context) => {
      if (context.user) {
        return Testimonial.create({ testimonialText, user: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeTestimonial: async (parent, { testimonialId }) => {
      return Testimonial.findOneAndDelete({ _id: testimonialId });
    },

    updateTestimonial: async (parent, { id }) => {
      return await Testimonial.findOneAndUpdate({ _id: Testimonial }, { new: true });
    },

    addProduct: async (parent, { product }) => {
      return Product.create({ product });
    },

    removeProduct: async (parent, { product }) => {
      return Product.findOneAndDelete({ _id: product });
    },

    updateProduct: async (parent, { Product }) => {
      return await Product.findOneAndUpdate({ _id: productId }, { new: true });
    },

    addUser: async (parent, args) => {
      const user = await User.create({ ...args });
      const token = signToken(user);
      return { token, user };
    },

    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    updateUser: async (parent, { User }) => {
      return await User.findOneAndUpdate({ _id: User }, { new: true });
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;

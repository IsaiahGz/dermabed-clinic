const { Testimonial, Product, User, PurchaseHistory } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    testimonials: async () => {
      return Testimonial.find({ isApproved: true }).sort({ createdAt: -1 }).populate('user');
    },

    adminTestimonials: async (parent, { testimonialText, userId }, context) => {
      if (context.user.isAdmin) {
        return Testimonial.find({}).sort({ createdAt: -1 }).populate('user');
      }
      throw new AuthenticationError('You need to be an admin!');
    },

    testimonial: async (parent, { testimonialId }) => {
      return Testimonial.findOne({ _id: testimonialId }).populate('user');
    },

    product: async (parent, { productId }) => {
      return Product.findOne({ _id: productId });
    },

    productsList: async (parent, { productIds }) => {
      const products = await Product.find({
        _id: { $in: productIds },
      });
      return products;
    },

    products: async () => {
      return Product.find();
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
    purchaseHistoryBySession: async (parent, { checkoutSessionId }) => {
      // Populate product in productsQuantity array
      return PurchaseHistory.findOne({ checkoutSessionId }).populate('productsQuantity.product');
    },
    getMyPurchaseHistory: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const userEmail = context.user.email;
      return PurchaseHistory.find({ email: userEmail }).populate('productsQuantity.product');
    },
  },

  Mutation: {
    addTestimonial: async (parent, { testimonialText }, context) => {
      if (context.user) {
        return Testimonial.create({ testimonialText, user: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeTestimonial: async (parent, { testimonialId }) => {
      return Testimonial.findOneAndDelete({ _id: testimonialId });
    },

    // updateTestimonial: async (parent, { id, testimonialText }, context) => {
    //   if (context.user) {
    //     const testimonial = await Testimonial.findById(id);

    //     if (!testimonial || testimonial.userId.toString() !== context.user._id.toString()) {
    //       throw new Error('You do not have permission to update this testimonial');
    //     }

    //     // Update and save the testimonial
    //     testimonial.testimonialText = testimonialText;
    //     await testimonial.save();

    //     return testimonial;
    //   } else {
    //     throw new AuthenticationError('You must be logged in to update a testimonial');
    //   }
    // },

    // approveTestimonial: async (parent, { testimonialId, isApproved }, context) => {
    //   if (context.user.isAdmin) {
    //     try {
    //       const testimonial = await Testimonial.findById(testimonialId);

    //       if (!testimonial) {
    //         throw new Error('No testimonial found with this id');
    //       }

    //       testimonial.isApproved = isApproved;
    //       await testimonial.save();

    //       return testimonial;
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    //   throw new AuthenticationError('You need to be an admin!');
    // },

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
      // Check if user already exists
      const userAlreadyExists = await User.findOne({ email: args.email });
      if (userAlreadyExists) {
        throw new AuthenticationError('User with that email already exists');
      }
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
    checkout: async (parent, { cartItems }, context) => {
      // Loop over cartItems and create an array of products to pass to Stripe
      const line_items = [];
      for (let i = 0; i < cartItems.length; i++) {
        const product = await Product.findOne({ _id: cartItems[i].productId });
        // Make sure product is in stock and is valid
        if (product && product.inStock) {
          line_items.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: product.price * 100,
            },
            quantity: cartItems[i].quantity,
          });
        }
      }
      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        metadata: {
          // Rename productId to product
          productsQuantity: JSON.stringify(
            cartItems.map((item) => {
              return { product: item.productId, quantity: item.quantity };
            })
          ),
        },
        mode: 'payment',
        success_url:
          process.env.NODE_ENV === 'production'
            ? `${process.env.CLIENT_URL}/c/success?session_id={CHECKOUT_SESSION_ID}`
            : 'http://localhost:3000/c/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: process.env.NODE_ENV === 'production' ? `${process.env.CLIENT_URL}/cart` : 'http://localhost:3000/cart',
      });
      return { redirectUrl: session.url };
    },
  },
};

module.exports = resolvers;

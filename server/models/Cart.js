const { Schema, model } = require('mongoose');

const cartSchema = new Schema({

 productCount: 
    {
      type: Number,
      trim: true,
    },

    user: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
},
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  
);


cartSchema.virtual('cartCount').get(function () {
  return this.cart.length;
})

const Cart = model('Cart', cartSchema);

module.exports = Cart;

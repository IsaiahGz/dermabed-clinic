const { Schema, model } = require('mongoose');

const cartSchema = new Schema({

  userId: 
    {
        type: Schema.Types.ObjectId,
        ref: 'userId',
    },
  
//make this a virtual with an array of prodId
  productCount: 
    {
      type: Int,
      trim: true,
    },
  
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;

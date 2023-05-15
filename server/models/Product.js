const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: 
    {
      type: Number,
      trim: true,
    },
  
  description: 
    {
      type: String,
      trim: true,
    },
  
  inStock: 
    {
      type: Boolean,
      trim: true,
    },
  
});

const Product = model('Product', productSchema);

module.exports = Product;

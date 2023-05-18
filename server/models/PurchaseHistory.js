const { Schema, model } = require('mongoose');

const purchaseHistorySchema = new Schema({
  // Checkout session ID from Stripe
  checkoutSessionId: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
  },
  productsQuantity: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  amountTotal: {
    required: true,
    type: Number,
    trim: true,
  },
  name: {
    required: true,
    type: String,
    trim: true,
  },
});

const PurchaseHistory = model('PurchaseHistory', purchaseHistorySchema);

module.exports = PurchaseHistory;

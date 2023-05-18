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
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
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

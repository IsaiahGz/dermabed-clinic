const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const testimonialSchema = new Schema({
  testimonialText: {
    type: String,
    required: 'You need to leave a testimonial!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  userId: 
    {
      type: Schema.Types.ObjectId,
      ref: 'userId',
    },
  
  isApproved: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
//edited at-possibly?
});

const Testimonial = model('Testimonial', testimonialSchema);

module.exports = Testimonial;

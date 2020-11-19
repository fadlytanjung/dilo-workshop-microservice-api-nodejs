const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'productId required']
  },
  productName: {
    type: String,
    minlength: 3,
    trim: true,
    required: [true, 'productName required'],
  }
});

module.exports = mongoose.model('products', productSchema);
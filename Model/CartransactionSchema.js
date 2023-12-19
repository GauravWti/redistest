const mongoose=require('mongoose');


const cartransactionSchema = new mongoose.Schema({
    carType: {
      type: String,
      required: true,
      trim: true,
    },
    cardNumber: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  });

  const cartransaction = mongoose.model('cartransaction', cartransactionSchema);

// Exporting the Blogs model using CommonJS syntax
module.exports = {cartransaction};
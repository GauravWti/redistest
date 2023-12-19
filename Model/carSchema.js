const mongoose=require('mongoose');

const carSchema = new mongoose.Schema({
    vehicleType: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  });

  const carquantity = mongoose.model('carquantity', carSchema);

  // Exporting the Blogs model using CommonJS syntax
  module.exports = {carquantity};
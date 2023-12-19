

const mongoose = require('mongoose');


const cartransactionSchema = new mongoose.Schema({
  carType: {
    type: String,
    
    trim: true,
  },
  carNumber: {
    type: String,
    
    trim: true,
  },
  startDay: {
    type: String,
   
    trim: true,
  },
  startTime:{
    type: String,
  },
  endTime:{
    type:String,
  },
  EndDay:{
    type:String,
    trim:true,
  },
  amount: {
    type: String,
   
  },
  status:{
    type:String,
  }
});

const cartransaction = mongoose.model('cartransaction', cartransactionSchema);

const venderSchema = new mongoose.Schema({
  venderName: {
    type: String,
    required: true,
    trim: true,
    unique: true, // This enforces uniqueness
   } ,
  contact: {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  document: [{
    IdProofType: {
      type: String,
      trim: true,
    },
    Link: {
      type: String,
      trim: true,
    },
  }],
  bankDetails: {
    ifsc: {
      type: String,
      trim: true,
    },
    holderName: {
      type: String,
      trim: true,
    },
  },
  cars: [{
    vehicleType: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    }
  }],
  moneyReceived: [
    {
      year: {
        type: Number,
        required: true,
      },
      month: {
        type: String,
        required: true,
      },
      time:{
        type:String,
        required:true,
      },
      day:{
        type:String,
      },
      transactions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'cartransaction',
        },
      ],
      reservationId:{
        type:String,
      }
    },
  ],
  booking:[
    {
      timeofbooking:{
        type:String,
        require:true,
      },
      reservationId:{
        type:String
      }
    }
  ]
});

const Vender = mongoose.model('Vender', venderSchema);

module.exports = { Vender, cartransaction };

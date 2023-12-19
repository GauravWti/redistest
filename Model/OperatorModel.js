
const mongoose=require('mongoose');

const Operatorschema=new mongoose.Schema({
    OperatorName:{
        type:String,
        trim: true,
        unique: true,
    },
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
      bookingAssign:[
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

})


const Operator=mongoose.model('Operator',Operatorschema);

module.exports={Operator};
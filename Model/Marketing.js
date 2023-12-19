const mongoose=require('mongoose');

const MarketingSchema=new mongoose.Schema({
    MarketingName:{
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
      BlogPost:[
        {
          timeofPosting:{
            type:String,
            require:true,
          },
          blogId:{
            type:String
          }
        }
      ],
      BlogUpdate :[
        {
            timeOfUpdate:{
                type:String,
                
            },
            blogId:{
                type:String,
            }
        }
      ]
})

const Marketing=mongoose.model('Marketing',MarketingSchema);

module.exports={Marketing};
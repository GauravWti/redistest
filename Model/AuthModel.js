const mongoose=require('mongoose');


const AuthModelschema=new mongoose.Schema({
    userName:{
        type:String,
        require:true,
    },
    password:{
        type:String,

    },
    role:{
        type:String,
    },
    name:{
        type:String
    }
})

const AuthModel=mongoose.model('AuthModel',AuthModelschema);

module.exports={AuthModel};
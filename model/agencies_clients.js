const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const acSchema=new Schema({
    agencyName:{
        type:"String",
        required:true
    },
    address1:{
        type:"String",
        required:true
    },
    address2:{
        type:"String"
    },
    state:{
        type:"String",
        required:true
    },
    city:{
        type:"String",
        required:true
    },
    phone:{
        type:"String",
        required:true
    },
    clients:[{
            id:Schema.Types.ObjectId,
            name: String,
            email: String,
            number: String,
            bill: String
          }]    
     
    })
module.exports=mongoose.model('Agency',acSchema);
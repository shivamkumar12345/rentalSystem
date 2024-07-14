const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
      ownerId:{
        type: String, //to store owner email
        ref:'users',
        required:true
      } ,
      category:{
            type:String,
            // required:true
      },
      productName:{
            type:String,
            required:true
      } ,
      description:{
        type:String,
        required:true
      } ,
      pricePerDay:{
        type:Number,
        required:true
      },
      availabilityStatus:{
            type:String,
            // required:true
      } ,
      image:{
            type:String,
            required:true 
      } ,
      specifications:{
            type:JSON,
            // required:true
      }
});

module.exports  = mongoose.model('Products',productSchema);
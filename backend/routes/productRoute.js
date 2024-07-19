const express = require('express')
const productRouter = express.Router();
const Product = require('../models/products');
const { verifyToken } = require('../middleware');

productRouter.get('/product',async(req,res)=>{
    console.log(req.body);

    try{
        const products = await Product.find();
        res.send(products);
    }catch(err){
        console.log(err);
    }

})

productRouter.get('/user-product',async(req,res)=>{
  const token = req.header('Authorization');

  try{
      const user = verifyToken(token);

      const product = await Product.find({ownerId:user.email});
      res.status(200).send(product);
  }catch(err){
      res.status(400).send({msg:err})
  }

})

productRouter.post('/add-product',async(req,res)=>{
  
  try{
      const token = req.header('Authorization');
     
      const user = verifyToken(token);
      console.log(user);

      if(user.email){
        console.log(req.body,"product");
        const {productName, productPrice, productImage, productDesc}= req.body;
        const response = new Product({
          ownerId:user.email,
          pricePerDay:productPrice,
          productName:productName,
          description:productDesc,
          image:productImage,
          availabilityStatus:"available"
        }); 
        // console.log(response);

        await response.save();

        res.status(200).send('token verified')
      }
  }catch(err){
    res.status(400).send('token expired')
  }
})

productRouter.get('/search-product',async(req,res)=>{
      const {query} =req.query;

      console.log(query);
       const data = await Product.find({productName:{$regex: query}});
       console.log(data);

       res.status(200).send({msg:"searched successsfully",data})
})

module.exports = productRouter;
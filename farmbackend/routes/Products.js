const express = require('express');
const router = express.Router();
const {Product} = require('../models/products/products')
const Category = require("../models/categories/categories")


router.get(`/`, async (req,res)=>{
    // let filter = {};
    // if(req.query.category){
    //     filter = {category: req.query.category.split(',')}
    // }
    const productList = await Product.find().populate("category")
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList)
 })
 
 router.get(`/:id`, async (req,res)=>{
    const product = await Product.findById(req.params.id).populate('category')
    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product)
 })
 
 
 
 
 
 
 
 
 // app.get('/',(req,res)=>{
 //    Employee.find({}).then(data=>{
 //       res.send(data)
 //    }).catch(err=>{
 //       console.log(err)
 //    })
 //    // res.status(200).send(productList)
 // })
 
 router.post(`/`, async(req, res)=>{
//   const category= Category.findById(req.body.category)
//  if(!category) return res.status(400).send("Invalid Category")
 
    const product = await new Product({
       name:req.body.name,
       price:req.body.price,
       phone:req.body.phone,
       description:req.body.description,
       picture:req.body.picture,
       location:req.body.location,
       region:req.body.region,
       town:req.body.town,
       category:req.body.category
 
    })
        product.save();
    if(!product)
    return res.status(500).send('The product cannot be created')
   
    res.send(product)
 })
 
 
 
 
 
 router.delete("/:id",(req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(user=>{
        if(user){
            return res.status(200).json({success:true, message:"the users is deleted successfully"})
        } else{
            return res.status(404).json({success: false, message: "users not found"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
 })
 
 module.exports = router;
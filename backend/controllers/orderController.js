import User from "../models/userModel.js"
import Order from "../models/orderModel.js"
import dotenv from "dotenv";
dotenv.config();


import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const currency="usd"
const deliveryCharge=40

//Placing Orders
const placeOrder=async(req,res)=>{
    try {
       const {userId,amount,address,items}=req.body
       const orderData={
        userId:userId,
        amount:amount,
        address:address,
        items:items,
        paymentMethod:"cod",
        payment:false,
        date:Date.now()
       }
       const newOrder= new Order(orderData)
       await newOrder.save()
       await User.findByIdAndUpdate(userId,{cartData:{}})
       res.json({success:true,message:"Order Placed Successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//place order using stripe
const placeOrderStripe = async(req,res)=>{
  try {
    const {userId,items,amount,address}=req.body
    const {origin}=req.headers
    const orderData={
        userId:userId,
        amount:amount,
        address:address,
        items:items,
        paymentMethod:"stripe",
        payment:false,
        date:Date.now()
       }
       const newOrder= new Order(orderData)
       await newOrder.save()
       const line_items=items.map((item)=>({
        price_data:{
            currency:currency,
            product_data:{
                name:item.name
            },
            unit_amount:item.price,
        },
        quantity:item.quantity
       }))
       line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:deliveryCharge
        },
        quantity:1
       })
       const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
       })
       res.json({success:true,session_url:session.url})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

//verify Stripe
const verifyStripe = async (req, res) => {
    try {
        const {orderId,success,userId}=req.body
        if(success==='true'){
            await Order.findByIdAndUpdate(orderId,{payment:true})
            await User.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }else{
            await Order.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        res.json({success:false,message:error.message})    
    }
}

//place order using esewa
const placeOrderEsewa = async(req,res)=>{}

//display orders for admin
const displayAllOrders = async(req,res)=>{
    try {
        const orders=await Order.find({}) 
        res.json({success:true,orders})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//display orders for user
const displayUserOrders = async(req,res)=>{
    try {
        const {userId}=req.body
        const orders=await Order.find({userId:userId})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//update order status
const updateOrderStatus = async(req,res)=>{
    try {
        const {orderId,orderStatus}=req.body
        await Order.findByIdAndUpdate(orderId,{status:orderStatus})
        res.json({success:true,message:"Status updated successfully"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


export {placeOrder,placeOrderEsewa,placeOrderStripe,displayAllOrders,displayUserOrders,updateOrderStatus,verifyStripe}
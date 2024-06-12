const User = require("./User");
const Product = require("./Product");
const mongoose = require("mongoose");
const Cart = require("./Cart")
require('dotenv').config();


const Schema = mongoose.Schema;
const orderSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'preparing'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shipTo: {
        type: Object,
        required: true
    },
    contact: {
        type: Object,
        required: true
    },
    orderNum: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        productId: {
            type: mongoose.ObjectId,
            ref: 'Product',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            default: 1,
            required: true
        },
        size: {
            type: String,
            required: true
        }
    }]
},{timestamps:true})

orderSchema.methods.toJSON = function() {
    const obj = this._doc;   
    
    delete obj.__v;
    return obj;
}

orderSchema.post("save",async function(){
    const cart = await Cart.findOne({userId : this.userId})
    cart.items=[];
    await cart.save();
})



const Order = mongoose.model("Order",orderSchema);

module.exports = Order;
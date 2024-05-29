const User = require("./User");
const Product = require("./Product");
const mongoose = require("mongoose");
require('dotenv').config();


const Schema = mongoose.Schema;
const orderSchema = new Schema({
    shipTo: {
        type: Object,
        required: true
    },
    contact: {
        type: Object,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'preparing'
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
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
}



const Order = mongoose.model("Order",orderSchema);

module.exports = Order;
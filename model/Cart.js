const User = require("./User");
const Product = require("./Product");
const mongoose = require("mongoose");
require('dotenv').config();


const Schema = mongoose.Schema;
const cartSchema = new Schema({
   userId:{
        type: mongoose.ObjectId,
        ref: User,
   },
   items:[{
    productId:{
        type: mongoose.ObjectId,
        ref: Product,
    },
    size:{
        type: String,
        required:true,
    },
    qty:{
        type:Number,
        default:1,
        required:true,
    }
   }]
},{timestamps:true})

cartSchema.methods.toJSON = function() {
    const obj = this._doc;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
}



const Cart = mongoose.model("Cart",cartSchema);

module.exports = Cart;

const mongoose = require("mongoose");
require('dotenv').config();


const Schema = mongoose.Schema;
const productSchema = new Schema({
    sku: {
        type: String,
        required: true,
        unique:true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },    
    category: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Object,
        required: true
    },
    status:{
        type:String,
        default:"active"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

productSchema.methods.toJSON = function() {
    const obj = this._doc;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
}



const Product = mongoose.model("Product",productSchema);

module.exports = Product;
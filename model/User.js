const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    activityName: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    contact: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    zip: {
        type: String,
        default: ""
    },
    
    level:{
        type:String,
        default:"customer"
    }
},{timestamps:true})

userSchema.methods.toJSON = function() {
    const obj = this._doc;
    delete obj.password; 
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
}

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: '1d' });
    return token;
};

const User = mongoose.model("User",userSchema);

module.exports = User;
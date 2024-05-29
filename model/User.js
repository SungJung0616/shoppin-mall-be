const mongoose = require("mongoose");
require('dotenv').config();


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

const User = mongoose.model("User",userSchema);

module.exports = User;
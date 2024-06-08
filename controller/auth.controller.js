const authController = {};
const User = require('../model/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


authController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compareSync(password, user.password);
            if (isMatch) {
                const token = await user.generateToken();
                return res.status(200).json({ status: 'success', user, token });
            }
        }
        throw new Error("Invalid Email or Password");
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

authController.authenticate = async(req, res, next) => {
    try{        
        const tokenString = req.headers.authorization;        
        if(!tokenString)throw new Error("Authentication token does not exist.")
        const token = tokenString.replace("Bearer ","");        
        jwt.verify(token,JWT_SECRET_KEY,(error,payload)=>{
        if(error)throw new Error("Invalid Token")
        req.userId = payload._id;            
        })          
        next();

    }catch(error){
        res.status(400).json({status:"fail", error:error.message})
    }
}

authController.checkAdminPermission = async(req,res, next)=> {
    try{
        const { userId } = req;
        
        const user = await User.findById(userId);
      
        if(user.level !=="admin") throw new Error("NO PERMISSION")
        next();

    }catch(error){
        res.status(400).json({status:"fail", error:error.message})
    }
}


module.exports = authController;

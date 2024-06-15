const { TopologyDescription } = require('mongodb');
const User = require('../model/User');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userController = {}

userController.createUser = async (req,res)=>{
    try{
        const { email, name, password, level } = req.body;
        
        const user = await User.findOne({ email });
        if (user) {            
            return res.status(400).json({ status: 'fail', message: 'User already exists' });
        }
        
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password,salt) 
        const userLevel = level ? level : 'customer';  
         
        const newUser = new User({ email, name, password: hash, level:userLevel});
        
        await newUser.save();
        res.status(200).json({ status: 'User created successfully.' });

    }catch(error){
        res.status(400).json({ status: 'fail', error: 'Internal Server Error', error: error.message });
    }
};

userController.getUser = async (req,res) => {
    try{
        const { userId } = req;
        const user = await User.findById(userId)
        if(user){
            res.status(200).json({status:"success", user})
        } else {
            throw new Error("Invalid User");
        }
        
    }catch(error){
        res.status(400).json({status:"fail", error: error.message})
    }
};

userController.updateUser = async (req, res) => {
    try {        
        const userId = req.userId;        
        const { activityName, firstName, lastName, contact, address, city, zip} = req.body;    
        const updatedData = { activityName, firstName, lastName, contact, address, city, zip };  

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });        
        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }       
        res.status(200).json({ status: "success", user });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};


module.exports = userController;
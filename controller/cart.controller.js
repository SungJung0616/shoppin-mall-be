const Cart = require("../model/Cart")

const cartController = {}

cartController.addItemToCart= async (req,res) =>{
    try{
        const {userId} = req;
        const {productId, size, qty} = req.body;
        //유저를 가지고 카트 찾기
        let cart = await Cart.findOne({ userId });
       
        //유저가 만든 카트가 없다? 만들어주기
        if(!cart){
            cart = new Cart({userId});
            await cart.save();
        }
        //이미 카트에 들어가있는 아이템이 있는지? 사이즈는?
        const existItem = cart.items.find(
            (item)=>item.productId.equals(productId)&&item.size === size
        );
        if(existItem){
            throw new Error("Item already store in cart");
        }
        //있다면 에러
        //카트에 아이템 추가
        cart.items = [...cart.items,{productId,size,qty}]
        await cart.save();
        res.status(200).json({status:"success",data:cart, cartItemQty:cart.items.length});
    }catch(error){
        return res.status(400).json({status:"fail", error:error.message})
    }
}

cartController.getCart = async (req,res)=> {
    try{
        const {userId} = req;
        console.log(userId)
        //populate 에 대한 이해하고 넘어가기
        const cart = await Cart.findOne({userId}).populate({ 
            path:'items',
            populate:{
                path:'productId',
                model: "Product",
            }
        });
        res.status(200).json({status : "success", data: cart.items});

    }catch(error){
        return res.status(400).json({status:"fail", error:error.message})
    }
}




module.exports = cartController;
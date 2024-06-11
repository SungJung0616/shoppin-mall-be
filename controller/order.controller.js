const orderController = {};
const Order = require("../model/Order");
const { randomStringGenerator } = require("../utils/randomStringGenerator");
const productController = require("./product.controller");

orderController.createOrder = async (req,res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        //프론트엔드에서 데이터 보낸거 받기 userId, totalPrie,shipTo,contact, oderList
        
        const {userId} = req;
        const {shipTo, contact, totalPrice, orderList} = req.body;
        //order를 만들기 전에, 재고 확인하고, 재고 업데이트를 해야함.
        const insufficientStockItems = await productController.checkItemListStock(orderList,session);
        //order 만들기
        //재고가 충분하지 않은 item이 있으면 에러
        if(insufficientStockItems.length > 0){
            const errorMessage = insufficientStockItems.reduce(
                (total, item)=> (total += item.message), 
                ""
            ); 
            throw new Error(errorMessage)
        }
        const newOrder = new Order({
            userId,
            totalPrice,
            shipTo,
            contact,
            items: orderList,
            orderNum : randomStringGenerator(),
        })

        await newOrder.save({ session });
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ status: "success", orderNum: newOrder.orderNum });

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({status: "fail", error : error.message})
    }
}



module.exports = orderController;
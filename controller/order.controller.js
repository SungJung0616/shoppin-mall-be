const orderController = {};
const Order = require("../model/Order");
const mongoose = require("mongoose");
const { randomStringGenerator } = require("../utils/randomStringGenerator");
const productController = require("./product.controller");
const PAGE_SIZE = 5

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

orderController.getOrder = async (req,res) => {
    try{
        console.log("getOrder")
        const { userId } = req;
        const { page = 1 } = req.query;

        const pageNumber = parseInt(page, 10);
        if (isNaN(pageNumber) || pageNumber < 1) {
             return res.status(400).json({ status: "fail", error: "Invalid page number" });
        }

        const orderList = await Order.find({ userId: userId })
        .skip((pageNumber - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .populate({
            path: "items",
            populate: {
              path: "productId",
              model: "Product",
              select: "image name",
            },
          });
        const totalItemNum = await Order.find({ userId: userId }).count();

        const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
        res.status(200).json({ status: "success", data: orderList, totalPageNum });

    }catch(error){
        return res.status(400).json({ status: "fail", error: error.message });
    }
}

orderController.getOrderList = async (req, res, next) => {
    try {
      const { page, ordernum } = req.query;
  
      let cond = {};
      if (ordernum) {
        cond = {
          orderNum: { $regex: ordernum, $options: "i" },
        };
      }
  
      const orderList = await Order.find(cond)
        .populate("userId")
        .populate({
          path: "items",
          populate: {
            path: "productId",
            model: "Product",
            select: "image name",
          },
        })
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);
      const totalItemNum = await Order.find(cond).count();
  
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      res.status(200).json({ status: "success", data: orderList, totalPageNum });
    } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
    }
  };

  orderController.updateOrder = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );
      if (!order) throw new Error("Can't find order");
  
      res.status(200).json({ status: "success", data: order });
    } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
    }
  };
  
module.exports = orderController;
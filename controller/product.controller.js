
const Product = require("../model/Product")
const PAGE_SIZE = 5
const productController ={}

productController.createProduct = async (req, res) => {
    try{
        const { sku, name, size, image, category, description, price, stock, status} = req.body;
        const product = new Product({sku, name, size, image, category, description, price, stock, status});
        await product.save();
        res.status(200).json({status: "success", product})
    }catch(error){
        res.status(400).json({status:"fail", error: error.message})
    }
}

productController.getProducts = async (req, res) => {
    try {
        const { page, name } = req.query;
        const cond = { isDeleted: false }; 
        if (name) {
            cond.name = { $regex: name, $options: "i" };
        }

        let query = Product.find(cond);
        let response = { status: "success" };
        
        if (page) {
            query = query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
            const totalItemNumber = await Product.find(cond).countDocuments();
            const totalPageNumber = Math.ceil(totalItemNumber / PAGE_SIZE);
            response.totalPageNumber = totalPageNumber;
        }

        const productlist = await query.exec();
        response.data = productlist;
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

productController.updateProducts = async (req, res) => {
    try{
        const productId = req.params.id;
        const {sku, name, size, image, category, description, price, stock, status} = req.body;
        const product = await Product.findByIdAndUpdate({_id:productId},
            {sku, name, size, image, category, description, price, stock, status},
            {new:true}
        );
        if(!product)throw new Error("Item dosn't exist")
        res.status(200).json({status:"success", data: product})

    }catch(error){
        res.status(400).json({status:"fail", error: error.message})
    }
}

productController.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(
            productId,  // findByIdAndUpdate의 첫 번째 인자는 _id만 필요합니다.
            { isDeleted: true },
            { new: true }
        );
        if (!product) throw new Error("Item doesn't exist");
        res.status(200).json({ status: "success", data: product });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

productController.getProductDetail = async (req, res) => {
    try {
      
      const productId = req.params.id;
      
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ status: "success", data: product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
productController.checkStock = async (item) => {
    //내가 사려는 아이템 재고정보 들고오기
    const product = await Product.findById(item.productId)
    //내가 사려는 아이템 qty, 재고 비교
    if(product.stock[item.size] < item.qty){
        return {isVerify : false, message: `${product.name}의 ${item.size} 재고가 부족합니다.`}
    }
    const newStock = {...product.stock}
    newStock[item.size] -= item.qty
    product.stock = newStock;
    return {isVerify : true,}
    await product.save();
    //재고가 불충분하면 불충분 메세지와 데이터 반환
    //충분하면 재고에서 - qty 성공
}

productController.checkItemListStock = async (itemList) => {
    const insufficientStockItems = [];
    //재고를 확인하는 로직
    await Promise.all(itemList.map(async (item)=>{
        const stockCheck = await productController.checkStock(item);
        if(!stockCheck.isVerify){
            insufficientStockItems.push({item, message : stockCheck.message})
        }
        return stockCheck
    }))
    

    return insufficientStockItems;
}
 
  
module.exports = productController;
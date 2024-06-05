
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

productController.getProducts = async (req,res) => {
    try{
        const { page, name } = req.query;
        const cond = name ? { name: { $regex: name, $options: "i" } } : {};
        let query = Product.find(cond);
        let response = { status: "success" };
        if(page){
            query.skip((page-1)*PAGE_SIZE).limit(PAGE_SIZE)
            //최종몇개페이지
            const totalItemNumber = await Product.find(cond).count();
            const totalPageNumber = Math.ceil(totalItemNumber / PAGE_SIZE);
            response.totalPageNumber=totalPageNumber;
        }  

        const productlist = await query.exec();
        response.data = productlist;
        res.status(200).json(response)
    }catch(error){
        res.status(400).json({status:"fail", error: error.message})
    }
}
                 
module.exports = productController;
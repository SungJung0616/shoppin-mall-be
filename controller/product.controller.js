
const Product = require("../model/Product")

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
        const { name } = req.query;
        const query = {};
        if (name) {
            query.name = { $regex: name, $options: "i" }; 
          }
        
        const products = await Product.find(query);
        res.status(200).json({status: "success", data: products})
    }catch(error){
        res.status(400).json({status:"fail", error: error.message})
    }
}
                 
module.exports = productController;
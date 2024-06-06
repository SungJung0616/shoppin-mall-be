const express = require("express");
const authController = require("../controller/auth.controller");
const productController = require("../controller/product.controller")

const router = express.Router();


router.post('/', authController.authenticate, authController.checkAdminPermission, productController.createProduct);

router.get('/',productController.getProducts);

router.get('/:id', productController.getProductDetail);

router.put('/:id',authController.authenticate, authController.checkAdminPermission, productController.updateProducts)

router.delete('/:id', authController.authenticate, authController.checkAdminPermission, productController.deleteProduct);

module.exports = router;
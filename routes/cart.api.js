const express = require("express");
const authController = require("../controller/auth.controller");
const cartController = require("../controller/cart.controller");

const router = express.Router();


router.post('/',authController.authenticate, cartController.addItemToCart)
                
router.get('/', authController.authenticate, cartController.getCart)

router.get("/qty", authController.authenticate, cartController.getCartQty);

router.delete("/:id", authController.authenticate, cartController.deleteCartItem);

router.put("/:id", authController.authenticate, cartController.editCartItem);


module.exports = router;
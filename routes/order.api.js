const express = require("express");
const orderController = require("../controller/order.controller");
const authController = require("../controller/auth.controller");

const router = express.Router();

console.log("orderController")

router.post('/',authController.authenticate,orderController.createOrder)

module.exports = router;
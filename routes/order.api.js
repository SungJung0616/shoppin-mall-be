const express = require("express");
const orderController = require("../controller/order.controller");
const authController = require("../controller/auth.controller");

const router = express.Router();

router.get("/me", authController.authenticate, orderController.getOrder);

router.get("/", authController.authenticate, orderController.getOrderList);

router.post('/',authController.authenticate,orderController.createOrder)

router.put(
    "/:id",
    authController.authenticate,
    authController.checkAdminPermission,
    orderController.updateOrder
  );

module.exports = router;
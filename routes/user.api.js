const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

// endpoint for register

router.get('/me',authController.authenticate, userController.getUser)

router.put('/me', authController.authenticate, userController.updateUser);

router.post('/', userController.createUser);



module.exports = router;
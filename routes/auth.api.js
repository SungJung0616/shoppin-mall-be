const express = require("express");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const router = express.Router();


router.get('/me',authController.authenticate, userController.getUser)
router.post('/login', authController.loginWithEmail);



module.exports = router;
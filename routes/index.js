const express = require("express")
const router = express.Router();

const userAPI = require("./user.api")
const authAPI = require("./auth.api")

router.use('/auth', authAPI);

router.use('/user', userAPI);


module.exports = router;
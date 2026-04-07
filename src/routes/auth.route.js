const express = require("express")
const authControllers = require("../controllers/auth.controller")

const router=express.Router()

/* POST request"/api/auth/register" */
router.post("/register",authControllers.userRegisterController)

/* POST request /api/auth/login */
router.post("/login",authControllers.userLoginController)

module.exports = router;
const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const accountController = require("../controllers/accounts.controller")


const router = express.Router()

/**
 * POST request
 * /api/accounts/
 * creating a new account
 * Protected Route
 */
router.post("/",authMiddleware.authMiddleware,accountController.createAccountController)

module.exports = router;
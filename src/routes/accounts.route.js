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

/* 
-GET request
-/api/accounts/
-Get all accounts of the logged in user
-Protected Route
*/
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountController)


/* 
-GET request
- for fetching balance
- /api/accounts/balance/:accountId
*/
router.get("/balance/:accountId" , authMiddleware.authMiddleware , accountController.getAccountBalanceController)


module.exports = router;
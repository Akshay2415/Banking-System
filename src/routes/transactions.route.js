const {Router} = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const transactionController = require('../controllers/transactions.controller')

const transactionRoutes = Router()

/**
 * POST - /api/transaction
 * Create new transaction
 */
transactionRoutes.post("/", authMiddleware.authMiddleware , transactionController.createTransaction);

/* 
* POST - /api/transactions/system/initial-funds
* Create initial funds from system user
*/
transactionRoutes.post("/system/initial-funds" , authMiddleware.authSystemUserMiddleware , transactionController.createInitialFundTransaction)

module.exports = transactionRoutes;
const {Router} = require('express')
const transactionController = require('../controllers/transactions.controller')

const transactionRoutes = Router()

/**
 * POST - /api/transaction
 * Create new transaction
 */
transactionRoutes.post("/");

module.exports = transactionRoutes;
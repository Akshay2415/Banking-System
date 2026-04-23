const ledgerModel = require("../models/ledger.model")
const transactionModel = require("../models/transaction.model")
const emailService = require('../services/services.nodemailer')

/**
 * -Create a new transaction
 * THE 10 STEP TRANSFER FLOW:
 * 1.Validate request
 * 2.Validate Idempotency key
 * 3.Check amount status
 * 4.Define sender balance from ledger
 * 5.Create transaction (PENDING)
 * 6.Create DEBIT ledger entry
 * 7.Creste CREDIT ledger entry
 * 8.Mark transaction COMPLETED
 * 9.Commit monfoDB Session
 * 10.Send Email notification
 */


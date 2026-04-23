const ledgerModel = require("../models/ledger.model")
const transactionModel = require("../models/transaction.model")
const accountModel = require("../models/account.model")
const emailService = require('../services/services.nodemailer')

/**
 * -Create a new transaction
 * THE 10 STEP TRANSFER FLOW:
 * 1.Validate request
 * 2.Validate Idempotency key
 * 3.Check account status
 * 4.Define sender balance from ledger
 * 5.Create transaction (PENDING)
 * 6.Create DEBIT ledger entry
 * 7.Creste CREDIT ledger entry
 * 8.Mark transaction COMPLETED
 * 9.Commit monfoDB Session
 * 10.Send Email notification
 */

async function createTransaction(req,res){

/**
 * 1.Validate Request
 */

    const {fromAccount ,toAccount ,amount ,idempotencyKey} = req.body;

    if(fromAccount || toAccount || amount || idempotencyKey)
        return res.status(400).json({
            message:"From account , to account, amount and idempotency key are required"
        })

        const fromUserAccount = await accountModel.findOne({
        _id : fromAccount
    })

    const toUserAccount = await accountModel.findOne({
        _id : toAccount
    })

    if(!fromUserAccount||toUserAccount){
        return res.status(400).json({
            message : "Invalid FROM or TO account"
        })
    }

/**
 * 2.Validate Idempotency key
 */

    const isTransactioAlreadyExists = await transactionModel.findOne({
        idempotencyKey : idempotencyKey
    })

    if(isTransactioAlreadyExists){
        if(isTransactioAlreadyExists.status = "COMPLETED"){
        return res.status(200).json({
            message : "Transaction already proceed",
            transaction : isTransactioAlreadyExists
        })
        }
        if(isTransactioAlreadyExists.status = "PENDING"){
            return res.status(200).json({
                message : "Transaction is still processing",
            })
        }

        if(isTransactioAlreadyExists.status = "FAILED"){
            return res.status(500).json({
                message : "Transaction was failed , Please retry!",
            })
        }
        if(isTransactioAlreadyExists.status = "REVERSED"){
            return res.status(500).json({
                message : "Transaction was reversed , Please retry!",
            })
        }
    }

/**
 * 3.Check account status
 */
    if(fromUserAccount.status !=="ACTIVE" || toUserAccount.status !=="ACTIVE"){
        return res.status().json({
            message : "Both FromAccount and ToAccount must be active to process transaction"
        })
    }

}

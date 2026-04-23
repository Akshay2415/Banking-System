const express = require("express")
const cookieParser = require("cookie-parser") 

const app = express();

app.use(express.json());
app.use(cookieParser());

/**
 * Controller required
 */
const authRouter = require("./routes/auth.route")
const accountRouter = require("./routes/accounts.route")
const transactionRouter = require("./routes/transactions.route")

/**
 * Controller use
 */
app.use("/api/account",accountRouter)
app.use("/api/auth",authRouter)
app.use("/api/transaction",transactionRouter)

module.exports = app
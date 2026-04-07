require("dotenv").config()

const app = require('./src/app')
const connectDB = require("./src/config/db")

connectDB();


app.listen(8080,()=>{
    console.log("App is listening to port 8080")
})
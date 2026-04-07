const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to DB")
    })
    .catch(err=>{
        console.log("Error connecting to DB");
        process.exit(1);
        //this is use bcoz if error happens then only server is get to run 
        //and bcoz of that it used unecessary resources
    })
}

module.exports = connectDB;
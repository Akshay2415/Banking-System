const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:[true,"Account must be associated with user"],
        index:true
        //index is use in mongo for optimizing 
        //there are many users so to help for searching or sorting index is use , and follows the concept of B+ tree
    },
    status:{
        type:String,
        enum:{
            values:["ACTIVE","FROZEN","CLOSED"],
            message:"Status can be either ACTIVE,FROZEN or CLOSED"
        },
        default:"ACTIVE"
    },
    currency:{
        type:String,
        required:[true,"Currency is required"],
        default:"INR"
    }
},{
    timestamps:true
})

accountSchema.index({user:1 ,status:1});
//compund index or compund schema is use to so we search user by index or on status also

const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel;
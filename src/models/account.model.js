const mongoose = require("mongoose");
const ledgerModel = require("./ledger.model");

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

//creating this method to get balance from account 
//this balance came from single source of truth and that is ledger 
//to get balance in this func we add all the DEBIT and then subtract it from all the CREDIT amount from ledger 
accountSchema.methods.getBalance = async function(){

    //aggregate pipeline -- it is a some kind of feature in mongodb that help to run a custom query 
    //const balanceData = await ledgerModel.aggregate([
    //     {$match : {account : this._id} },
    //     {
    //         $group : {
    //             _id : null,
    //             totalDebit : {
    //                 $sum :{
    //                     $cond : [
    //                         {$ep :["$type" ,"DEBIT"]},
    //                         "$amount",
    //                         0
    //                     ]
    //                 }
    //             },
    //             totalCredit : {
    //                 $sum :{
    //                     $cond : [
    //                         {$ep :["$type" ,"CREDIT"]},
    //                         "$amount",
    //                         0
    //                     ]
    //                 }
    //             }
    //         }
    //     },
    //     {
    //         $project :{
    //             _id: 0,
    //             balance :{ $subtract : [ "totalCredit", "totalDebit" ]}
    //         }
    //     }
    // ])

        const balanceData = await ledgerModel.aggregate([
        { $match: { account: this._id } },
        {
            $group: {
                _id: null,
                totalDebit: {
                    $sum: {
                        $cond: [
                            { $eq: [ "$type", "DEBIT" ] },
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit: {
                    $sum: {
                        $cond: [
                            { $eq: [ "$type", "CREDIT" ] },
                            "$amount",
                            0
                        ]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                balance: { $subtract: [ "$totalCredit", "$totalDebit" ] }
            }
        }
    ])


    if(balanceData.length === 0){
        return 0;
    }

    return balanceData[ 0 ].balance
}

const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel;
const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Ledger must be associated with account"],
        index:true,
        immutable:true
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating a ledger entry"],
        immutable:true
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transaction",
        required:[true,"Ledger must be associated with transaction"],
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["CREDIT","DEBIT"],
            message:"Type can be CREDIT or DEBIT"
        },
        required:[true,"Ledger type is required"],
        immutable:true
    }
})

function preventledgerModification(){
    throw new Error("Ledger entried are immutable and cannot be deleted or modified")
}

ledgerSchema.pre('findOneAndUpdate',preventledgerModification);
ledgerSchema.pre('updateOne',preventledgerModification);
ledgerSchema.pre('deleteOne',preventledgerModification);
ledgerSchema.pre('deleteMany',preventledgerModification);
ledgerSchema.pre('remove',preventledgerModification);
ledgerSchema.pre('findOneAndReplace',preventledgerModification);
ledgerSchema.pre('findOneAndDelete',preventledgerModification);
ledgerSchema.pre('updateMany',preventledgerModification);

const ledgerModel = mongoose.model("ledger",ledgerSchema)

module.exports= ledgerModel;
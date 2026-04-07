const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
// const { use } = require("react")

const userSchema = mongoose.Schema({
    email :{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/] ,
        unique:[true,"Email already exists"]
    },
    name : {
        type:String,
        required:[true,"Name is required for creating an account"]
    },
    password : {
        type:String,
        reuired:[true,"Password is required for creating an account"],
        minlength:[6,"Password must contain more than 6 characters"],
        select:false
    }
},{
        timestamps:true
    }) 

userSchema.pre("save", async function(){
    //in this function we are checking user password is changed or not 

    if(!this.isModified("password")){
        return 
    }

    const hash = await bcrypt.hash(this.password,10)
    this.password= hash;

})

userSchema.methods.comparepassword = async function(password){

    return await bcrypt.compare(password , this.password)

}

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;
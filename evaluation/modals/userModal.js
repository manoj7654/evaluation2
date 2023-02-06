const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String,enum:["manager","customer"],default:"customer"}
},{
    versionKey:false,
})

const Usermodel=mongoose.model("user",userSchema)

module.exports={Usermodel}
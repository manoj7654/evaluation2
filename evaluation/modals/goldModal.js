const mongoose=require("mongoose")

const goldSchema=mongoose.Schema({
    goldRate:Number,
    userStatus:String,
    userId:String
})

const Goldmodel=mongoose.model("gold",goldSchema)

module.exports={Goldmodel}